-- Schema definition for the the famous ships database

DROP TABLE bike;

CREATE TABLE bike (
    name	VARCHAR(512) PRIMARY KEY NOT NULL,
    brand	VARCHAR(512),
    color	VARCHAR(512),
    price	NUMBER
);