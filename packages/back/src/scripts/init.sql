-- CLEANING

DROP TYPE IF EXISTS caretaker_type CASCADE;
DROP TYPE IF EXISTS pet_size CASCADE;
DROP VIEW IF EXISTS ratings;
DROP VIEW IF EXISTS all_ct;
DROP TABLE IF EXISTS cares_for;
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

CREATE TABLE users (
    username VARCHAR PRIMARY KEY, -- username cannot be changed
	email VARCHAR UNIQUE NOT NULL, -- enforce no duplicate emails
	password VARCHAR NOT NULL,
	address VARCHAR,
	city VARCHAR,
	country VARCHAR,
	postal_code INTEGER
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
    avg_rating NUMERIC DEFAULT 3.9,
	ct_type caretaker_type NOT NULL,
	CHECK(avg_rating <= 5)
);

CREATE TABLE availability_span (
	ctuname VARCHAR REFERENCES caretakers(ctuname),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (ctuname, start_date, end_date),
    CHECK (start_date < end_date AND end_date <= date('now') + interval '2 years')
);

CREATE TABLE pet_categories (
    species VARCHAR,
    breed VARCHAR,
	size VARCHAR,
	base_price NUMERIC, -- NULL is to allow insertion to pet_categories when we add pets / capabilities
	PRIMARY KEY(species, breed, size)
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
    pc_species VARCHAR NOT NULL,
	pc_breed VARCHAR NOT NULL,
	pc_size VARCHAR NOT NULL,
    ctuname VARCHAR NOT NULL REFERENCES caretakers(ctuname)
        ON DELETE CASCADE,
	FOREIGN KEY (pc_species, pc_breed, pc_size)
		REFERENCES pet_categories(species, breed, size),
	PRIMARY KEY (pc_breed, pc_size, pc_species, ctuname)
);


CREATE TABLE bid (
    rating INTEGER,
    price NUMERIC NOT NULL,
	payment_method VARCHAR NOT NULL,
	transfer_method VARCHAR NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	ctuname VARCHAR NOT NULL REFERENCES caretakers(ctuname),
	pouname VARCHAR NOT NULL,
	petname VARCHAR NOT NULL,
	is_win BOOLEAN NOT NULL DEFAULT false,
	CHECK (ctuname <> pouname),
	FOREIGN KEY (pouname, petname) REFERENCES pets(pouname, name),
	PRIMARY KEY(pouname, petname, start_date, end_date)
);

CREATE VIEW ratings AS (
    SELECT ctuname, AVG(rating)
    FROM bid
    GROUP BY ctuname
);

CREATE VIEW all_ct AS (
	SELECT * FROM is_capable B
		NATURAL JOIN caretakers C
		NATURAL JOIN availability_span A
);

-- TRIGGERS

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

CREATE OR REPLACE FUNCTION insert_pet_categories_if_not_exists() RETURNS trigger AS
$$
	DECLARE flag INTEGER;
	BEGIN
		SELECT COUNT(*) INTO flag FROM pet_categories C
			WHERE C.species = NEW.species AND C.breed = NEW.breed AND C.size = NEW.size;
		IF flag = 0 THEN
			INSERT INTO pet_categories(species, breed, size) SELECT NEW.species, NEW.breed, NEW.size;
		END IF;
	RETURN NEW;
	END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER insert_capability_if_not_exists
	BEFORE INSERT OR UPDATE ON is_capable
	FOR EACH ROW EXECUTE PROCEDURE insert_pet_categories_if_not_exists();

CREATE TRIGGER insert_pet_category_if_not_exists
	BEFORE INSERT OR UPDATE ON pets
	FOR EACH ROW EXECUTE PROCEDURE insert_pet_categories_if_not_exists();

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

-- SEED DATA
