DROP DATABASE IF EXISTS employees_db;
-- Creates the "employees_Db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
USE employees_db;

-- Creates the table "produce" within employees_Db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT  ,
    title VARCHAR(30),
    salary DECIMAL,
    --need to make department_id linked to department table--
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    --need to make role_id linked to role table--
    role_id INT NOT NULL,
    manager_id INT NOT NULL
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
);


-- SELECT role_id,role_title, role_salary, department_name
-- FROM departments INNER JOIN role
--                 ON department.id = role.department_Id

-- SELECT employee_id,employee_first_name, employee_last_name,employee_role_id,employee_manager_id 
-- FROM role INNER JOIN employee
--                 ON role.department_id = employees.department_Id