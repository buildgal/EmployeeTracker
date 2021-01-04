CREATE DATABASE employee_list_db;

USE employee_list_db;

-- Create the table tasks.

CREATE TABLE department_tb (
  id int NOT NULL AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

USE employee_list_db;
CREATE TABLE role_tb (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal (5,2),
  department_id int,
  PRIMARY KEY (id)
);

USE employee_list_db;
CREATE TABLE employee_tb (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);