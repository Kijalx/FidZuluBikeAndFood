DROP TABLE food;

CREATE TABLE food (
    name VARCHAR2(512) PRIMARY KEY NOT NULL,
    brand VARCHAR2(512),
    weight VARCHAR2(512),
    calories INT,
    price NUMBER
);