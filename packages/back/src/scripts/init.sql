-- CLEANING

DROP TABLE IF EXISTS users;

-- INITIALIZING

CREATE TABLE users (
    email VARCHAR PRIMARY KEY,
	name VARCHAR NOT NULL,
	password VARCHAR NOT NULL
);

INSERT into users (email, name, password)
VALUES ('petsos@petsos.com', 'petsos', 'petsos123');

-- SUCCESS