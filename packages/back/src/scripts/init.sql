-- CLEANING

DROP TYPE IF EXISTS caretaker_type CASCADE;
DROP TYPE IF EXISTS pet_size CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP VIEW IF EXISTS ratings;
DROP VIEW IF EXISTS all_ct;
DROP TABLE IF EXISTS multiplier;
DROP TABLE IF EXISTS bid;
DROP TABLE IF EXISTS is_capable;
DROP TABLE IF EXISTS special_reqs;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS pet_categories;
DROP TABLE IF EXISTS availability_span;
DROP TABLE IF EXISTS caretakers;
DROP TABLE IF EXISTS pcs_admin;
DROP TABLE IF EXISTS pet_owners;
DROP TABLE IF EXISTS users;

-- INITIALIZING

CREATE TYPE caretaker_type AS ENUM ('part-time', 'full-time');
CREATE TYPE pet_size AS ENUM('small', 'medium', 'large');
CREATE TYPE payment_method AS ENUM('credit', 'cash');

-- CREATE TABLE address (
-- 	city VARCHAR,
-- 	country VARCHAR,
-- 	postal_code INTEGER,
-- 	PRIMARY KEY (city, country, postal_code)
-- )

CREATE TABLE users (
    username VARCHAR PRIMARY KEY, -- username cannot be changed
	email VARCHAR UNIQUE NOT NULL, -- enforce no duplicate emails
	password VARCHAR NOT NULL,
	address VARCHAR,
	city VARCHAR,
	country VARCHAR,
	postal_code INTEGER,
	credit_card NUMERIC(16)
);

CREATE TABLE pet_owners (
    username VARCHAR PRIMARY KEY REFERENCES users(username)
		ON DELETE CASCADE
);

CREATE TABLE pcs_admin (
     username VARCHAR PRIMARY KEY REFERENCES users(username)
	 	ON DELETE CASCADE
);

CREATE TABLE caretakers (
    ctuname VARCHAR PRIMARY KEY REFERENCES users(username)
		ON DELETE CASCADE,
	ct_type caretaker_type NOT NULL
);

CREATE TABLE availability_span (
	ctuname VARCHAR REFERENCES caretakers(ctuname),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (ctuname, start_date, end_date),
    CHECK (start_date <= end_date AND end_date <= date('now') + interval '2 years')
);

CREATE TABLE pet_categories (
    species VARCHAR,
    breed VARCHAR,
	size VARCHAR,
	base_price NUMERIC NOT NULL, -- NOT NULL because we add pet categories only from admin
	PRIMARY KEY(species, breed, size),
	CHECK (base_price > 0)
);

CREATE TABLE pets (
    name VARCHAR,
    pouname VARCHAR REFERENCES pet_owners(username)
		ON DELETE CASCADE,
	species VARCHAR NOT NULL,
    breed VARCHAR,
	size VARCHAR NOT NULL,
    FOREIGN KEY (species, breed, size) REFERENCES pet_categories(species, breed, size),
	PRIMARY KEY (name, pouname)
);

CREATE TABLE special_reqs (
	pouname VARCHAR NOT NULL,
	petname VARCHAR NOT NULL,
	description VARCHAR NOT NULL,
	FOREIGN KEY (petname, pouname)
		REFERENCES pets(name, pouname),
	PRIMARY KEY(pouname, petname, description)
);

CREATE TABLE is_capable (
    species VARCHAR NOT NULL,
	breed VARCHAR NOT NULL,
	size VARCHAR NOT NULL,
    ctuname VARCHAR NOT NULL REFERENCES caretakers(ctuname)
        ON DELETE CASCADE,
	FOREIGN KEY (species, breed, size)
		REFERENCES pet_categories(species, breed, size),
	PRIMARY KEY (breed, size, species, ctuname)
);


CREATE TABLE bid (
    rating FLOAT(5) CHECK (rating <= 5),
    price NUMERIC(20, 3) NOT NULL,
	payment_method payment_method NOT NULL,
	transfer_method VARCHAR NOT NULL,
	review VARCHAR,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	ctuname VARCHAR NOT NULL REFERENCES caretakers(ctuname),
	-- ct_avail_start DATE NOT NULL,
	-- ct_avail_end DATE NOT NULL,
	pouname VARCHAR NOT NULL,
	petname VARCHAR NOT NULL,
	is_win BOOLEAN NOT NULL DEFAULT false,
	CHECK (ctuname <> pouname),
	CHECK (NOT ((NOT is_win) AND (rating is NOT NULL OR review is NOT NULL))), -- this checks that rating and review can only be available if its a winning bid
	-- CHECK (start_date >= ct_avail_start AND end_date <= ct_avail_end),
	FOREIGN KEY (pouname, petname) REFERENCES pets(pouname, name),
	-- FOREIGN KEY (ctuname, ct_avail_start, ct_avail_end) REFERENCES availability_span(ctuname, start_date, end_date),
	PRIMARY KEY(pouname, ctuname, petname, start_date, end_date)
);

CREATE TABLE multiplier (
	avg_rating FLOAT(5) CHECK (avg_rating <= 5), -- >= avg_rating, get multiplied by multiplier
	multiplier FLOAT(5),
	PRIMARY KEY (avg_rating, multiplier)
);

CREATE VIEW ratings AS (
    SELECT ctuname,  round( CAST(avg(rating) as numeric) ) as avg_rating
    FROM bid
    GROUP BY ctuname
);

CREATE VIEW all_ct AS (
	SELECT * FROM
		(caretakers
			NATURAL JOIN (SELECT username AS ctuname, city, country, postal_code FROM users) AS users
			NATURAL JOIN (SELECT * FROM is_capable NATURAL JOIN pet_categories) AS cap
			NATURAL JOIN availability_span) AS ct_avail_cap
    	NATURAL LEFT JOIN ratings
);

-- TRIGGERS

-- make every user a pet owner.

CREATE OR REPLACE FUNCTION user_is_pet_owner() RETURNS trigger AS
$$
	BEGIN
		INSERT INTO pet_owners(username) VALUES (NEW.username);
	RETURN NEW;
	END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER user_is_pet_owner
	AFTER INSERT ON users
	FOR EACH ROW EXECUTE PROCEDURE user_is_pet_owner();

-- insert pet category to pet_categories if it doesnt exist yet. Not sure if we still need it. Triggered by upsert to is_capable and pets

-- CREATE OR REPLACE FUNCTION insert_pet_categories_if_not_exists() RETURNS trigger AS
-- $$
-- 	DECLARE flag INTEGER;
-- 	BEGIN
-- 		SELECT COUNT(*) INTO flag FROM pet_categories C
-- 			WHERE C.species = NEW.species AND C.breed = NEW.breed AND C.size = NEW.size;
-- 		IF flag = 0 THEN
-- 			INSERT INTO pet_categories(species, breed, size) SELECT NEW.species, NEW.breed, NEW.size;
-- 		END IF;
-- 	RETURN NEW;
-- 	END;
-- $$
-- LANGUAGE plpgsql;

-- CREATE TRIGGER insert_capability_if_not_exists
-- 	BEFORE INSERT OR UPDATE ON is_capable
-- 	FOR EACH ROW EXECUTE PROCEDURE insert_pet_categories_if_not_exists();

-- CREATE TRIGGER insert_pet_category_if_not_exists
-- 	BEFORE INSERT OR UPDATE ON pets
-- 	FOR EACH ROW EXECUTE PROCEDURE insert_pet_categories_if_not_exists();


-- trigger for ensuring that full time ct's availability span is 150 days apart. Triggered on availability_span.

CREATE OR REPLACE FUNCTION full_time_must_150() RETURNS trigger AS
$$
	DECLARE flag INTEGER := 0;
	BEGIN
		SELECT (
			CASE
				WHEN ct_type = 'full-time' THEN 1
				WHEN ct_type = 'part-time' THEN 0
			END) INTO flag
			FROM caretakers
			WHERE ctuname = NEW.ctuname;

		IF FLAG = 1 THEN
			IF date(NEW.start_date) + interval '150 days' > date(NEW.end_date) THEN
				RAISE EXCEPTION 'DATE RANGE UNDER 150 DAYS!';
				RETURN NULL;
			END IF;
		END IF;
		RETURN NEW;
	END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER full_time_must_150
	BEFORE INSERT OR UPDATE on availability_span
	FOR EACH ROW EXECUTE PROCEDURE full_time_must_150();


-- Trigger to ensure that availabilities are merged to the largest availability span possible. Triggered on availability_span.

CREATE OR REPLACE FUNCTION merge_availabilities() RETURNS trigger AS
$$
	DECLARE flag INTEGER := 0;
	DECLARE temp_start DATE;
	DECLARE temp_end DATE;
	BEGIN
		DELETE FROM availability_span A WHERE A.ctuname = NEW.ctuname AND A.start_date >= NEW.start_date AND A.end_date <= NEW.end_date;
		SELECT SUM(
			CASE
				WHEN A.start_date <= NEW.start_date AND A.end_date >= NEW.end_date THEN 4
				WHEN NEW.end_date >= A.start_date AND NEW.end_date <= A.end_date THEN 1
				WHEN NEW.start_date <= A.end_date AND NEW.start_date >= A.start_date THEN 2
				ELSE 0
			END) INTO flag

			FROM availability_span A
			WHERE A.ctuname = NEW.ctuname;

	-- RAISE NOTICE '%', flag;
		CASE COALESCE(flag, 0)
			WHEN 0 THEN RETURN NEW;
			WHEN 1 THEN
				SELECT end_date INTO temp_end FROM availability_span A
					WHERE NEW.end_date >= A.start_date AND NEW.end_date <= A.end_date AND NEW.ctuname = A.ctuname;
				DELETE FROM availability_span A WHERE end_date = temp_end AND NEW.ctuname = A.ctuname;
				INSERT INTO availability_span(ctuname, start_date, end_date) VALUES (NEW.ctuname, NEW.start_date, temp_end);
			WHEN 2 THEN
				SELECT start_date INTO temp_start FROM availability_span A
					WHERE NEW.start_date <= A.end_date AND NEW.start_date >= A.start_date AND NEW.ctuname = A.ctuname;
				DELETE FROM availability_span A WHERE start_date = temp_start AND NEW.ctuname = A.ctuname;
				-- RAISE NOTICE 'deleted start: %', temp_start;
				INSERT INTO availability_span(ctuname, start_date, end_date) VALUES (NEW.ctuname, temp_start, NEW.end_date);
			WHEN 3 THEN
				SELECT end_date INTO temp_end FROM availability_span A
					WHERE NEW.end_date >= A.start_date AND NEW.end_date <= A.end_date AND NEW.ctuname = A.ctuname;
				DELETE FROM availability_span A WHERE end_date = temp_end AND NEW.ctuname = A.ctuname;
				-- RAISE NOTICE 'deleted end: %', temp_end;
				SELECT start_date INTO temp_start FROM availability_span A
					WHERE NEW.start_date <= A.end_date AND NEW.start_date >= A.start_date AND NEW.ctuname = A.ctuname;
				DELETE FROM availability_span A WHERE start_date = temp_start AND NEW.ctuname = A.ctuname;
				-- RAISE NOTICE 'deleted start: %', temp_start;
				-- RAISE NOTICE 'deleted end: %', temp_end;
				INSERT INTO availability_span(ctuname, start_date, end_date) VALUES (NEW.ctuname, temp_start, temp_end);
			ELSE NULL;
		END CASE;
	RETURN NULL;
	END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER maintain_availability_non_overlapness
	BEFORE INSERT OR UPDATE ON availability_span
	FOR EACH ROW EXECUTE PROCEDURE merge_availabilities();

-- update price in bid to be total pet day * base price for pet category
-- not yet take ct rating into account of the calculation
CREATE OR REPLACE FUNCTION calculate_price() RETURNS trigger AS
$$
	DECLARE bp NUMERIC := 0;
	BEGIN
		SELECT COALESCE(base_price, 0) into bp
			FROM pets p NATURAL JOIN pet_categories pc
			WHERE p.name = NEW.petname AND p.pouname = NEW.pouname;
		-- RAISE NOTICE '%', bp;
		UPDATE bid SET price = bp * (NEW.end_date - NEW.start_date + 1)
			WHERE petname = NEW.petname AND pouname = NEW.pouname AND start_date = NEW.start_date AND end_date = NEW.end_date;
		RETURN NULL;
	END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER calculate_price
	AFTER INSERT ON bid
	FOR EACH ROW EXECUTE PROCEDURE calculate_price();

-- SEED DATA
