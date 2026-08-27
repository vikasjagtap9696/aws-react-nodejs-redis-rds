CREATE DATABASE IF NOT EXISTS productsdb;

USE productsdb;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    price INT
);

INSERT INTO products (name, price)
VALUES
('Laptop', 1000),
('Phone', 500),
('Keyboard', 100),
('Mouse', 150),
('Wire', 570),
('Mike', 100);