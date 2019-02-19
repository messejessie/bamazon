DROP DATABASE IF EXISTS products_DB;
CREATE DATABASE products_DB;

USE products_DB;

CREATE TABLE inventory(
  item_id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO inventory (item_name, department_name, price, quantity,stock_quantity)
VALUES 

("Tesla Roadster","Car", 100000.00, 20, 100),
("Solar Roofs","Home Improvement", 50000.00, 150, 3000),
("Starship", "Travel", 300000.00, 5, 5),
("Not a Flame Thrower","Family Fun", 500.00, 20, 500),
("A Shrubbery", "Home Improvement", 60.00, 3, 6),
("Medieval castle w/ taunting french solider","Family Fun", 40000.00, 1, 3),
("96oz of Diet Coke", "Food and Drink", 50.00, 1000, 3000),
("Hitchhikers guide to the Galxay towel", "Travel", 30.00, 7000,100000),
("Vogon Poetry Book", "Books", .50, 12, 30),
("Holy Grail", "Art", 70.00, 30, 40);