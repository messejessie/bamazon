DROP DATABASE IF EXISTS products_DB;
CREATE DATABASE products_DB;

USE products_DB;

CREATE TABLE inventory(
  item_id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL
  PRIMARY KEY (item_id)
);

