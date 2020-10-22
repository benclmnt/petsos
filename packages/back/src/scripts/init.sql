-- CLEANING

DROP TYPE IF EXISTS caretaker_type CASCADE;
DROP TYPE IF EXISTS pet_size CASCADE;
DROP VIEW IF EXISTS ratings;
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
    username VARCHAR PRIMARY KEY,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	address VARCHAR,
	city VARCHAR,
	country VARCHAR,
	postal_code VARCHAR
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
    username VARCHAR PRIMARY KEY REFERENCES users(username)
		ON DELETE CASCADE,
    avg_rating NUMERIC DEFAULT 4,
	ct_type caretaker_type NOT NULL,
	CHECK(avg_rating <= 5)
);

CREATE TABLE availability_span (
	ctuname VARCHAR REFERENCES caretakers(username),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (ctuname, start_date, end_date),
    CHECK (start_date < end_date)
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
    ctuname VARCHAR NOT NULL REFERENCES caretakers(username)
        ON DELETE CASCADE,
	FOREIGN KEY (pc_breed, pc_species, pc_size)
		REFERENCES pet_categories(breed, species, size),
	PRIMARY KEY (pc_breed, pc_size, pc_species, ctuname)
);


CREATE TABLE bid (
    rating INTEGER,
    price NUMERIC NOT NULL,
	payment_method VARCHAR NOT NULL,
	transfer_method VARCHAR NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	ctuname VARCHAR NOT NULL REFERENCES caretakers(username),
	pouname VARCHAR NOT NULL,
	petname VARCHAR NOT NULL,
	is_win BOOLEAN NOT NULL DEFAULT false,
	FOREIGN KEY (pouname, petname) REFERENCES pets(pouname, name),
	PRIMARY KEY(pouname, petname, start_date, end_date)
);

CREATE VIEW ratings AS (
    SELECT ctuname, AVG(rating)
    FROM bid
    GROUP BY ctuname
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
		IF flag > 0 THEN
			RETURN NULL;
		ELSE
			INSERT INTO pet_categories(species, breed, size) SELECT NEW.species, NEW.breed, NEW.size;
			RETURN NEW;
		END IF;
	RETURN 1;
	END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER insert_capability_if_not_exists
	BEFORE INSERT OR UPDATE ON is_capable
	FOR EACH ROW EXECUTE PROCEDURE insert_pet_categories_if_not_exists();

CREATE TRIGGER insert_pet_category_if_not_exists
	BEFORE INSERT OR UPDATE ON pets
	FOR EACH ROW EXECUTE PROCEDURE insert_pet_categories_if_not_exists();

-- SEED DATA
