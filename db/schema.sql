DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE employee (
  first_name VARCHAR(30) last_name VARCHAR(30) role_id INT manager_id INT id INT PRIMARY KEY
);
CREATE TABLE roll (
  title VARCHAR(30) salary DECIMAL department_id INT id INT PRIMARY KEY
);
CREATE TABLE department (name VARCHAR(30) id INT PRIMARY KEY);