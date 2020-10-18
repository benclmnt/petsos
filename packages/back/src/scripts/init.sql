-- CLEANING

DROP TABLE IF EXISTS users;

-- INITIALIZING

CREATE TABLE users (
    email VARCHAR(255) NOT NULL,
	username VARCHAR(255) PRIMARY KEY,
	password VARCHAR(255) NOT NULL,
	address VARCHAR(255),
	postal VARCHAR(255),
	city VARCHAR(255),
	country VARCHAR(255)
);

INSERT into users (email, username, password)
VALUES ('petsos@petsos.com', 'petsos', 'petsos123'),
	('admin@petsos.com', 'admin', 'iamthesuperadmin');

-- SUCCESS
