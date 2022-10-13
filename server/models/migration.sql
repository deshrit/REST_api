-- DATABASE
CREATE DATABASE REST_api;

-- Users Table
CREATE TABLE users (
	userid BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(100) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(64) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy users
INSERT INTO users(username, email, password) 
values ("deshrit", "deshrit@gmail.com", "deshrit"), ("sabin", "sabin@gmail.com", "sabin");


-- Fetch all rows from table
SELECT * FROM users;

-- Fetch one row from table
SELECT * FROM users WHERE userid = 1 LIMIT 1;