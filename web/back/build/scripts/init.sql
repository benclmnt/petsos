-- CLEANING

DROP VIEW IF EXISTS ratings;
DROP TABLE IF EXISTS cares_for;
DROP TABLE IF EXISTS date;
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
    avg_rating NUMERIC,
	caretaker_type VARCHAR NOT NULL
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
	base_price NUMERIC NOT NULL,
	PRIMARY KEY (species, breed, size)
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
	pc_breed VARCHAR NOT NULL,
	pc_size VARCHAR NOT NULL,
    pc_name VARCHAR NOT NULL,
    ctuname VARCHAR NOT NULL REFERENCES caretakers(username)
        ON DELETE CASCADE,
	FOREIGN KEY (pc_breed, pc_name, pc_size)
		REFERENCES pet_categories(breed, species, size),
	PRIMARY KEY (pc_breed, pc_size, pc_name, ctuname)
);

CREATE TABLE date (
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	PRIMARY KEY (start_date, end_date)
);

CREATE TABLE cares_for (
    rating INTEGER,
    price NUMERIC NOT NULL,
	payment_method VARCHAR NOT NULL,
	transfer_method VARCHAR NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	ctuname VARCHAR NOT NULL REFERENCES caretakers(username),
	pouname VARCHAR NOT NULL,
	petname VARCHAR NOT NULL,
	FOREIGN KEY (start_date, end_date) REFERENCES date(start_date, end_date),
	FOREIGN KEY (pouname, petname) REFERENCES pets(pouname, name),
	PRIMARY KEY(pouname, petname, start_date, end_date)
);

CREATE VIEW ratings AS (
    SELECT ctuname, AVG(rating)
    FROM cares_for
    GROUP BY ctuname
);

-- SEED DATA
