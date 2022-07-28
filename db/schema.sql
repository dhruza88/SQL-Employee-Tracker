DROP DATABASE IF EXISTS employees_db;
-- Creates the "employees_Db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
USE employees_db;

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,    
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

ALTER TABLE employee
    ADD CONSTRAINT role_id
        FOREIGN KEY (role_id)
            REFERENCES role (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    ADD CONSTRAINT manager_id    
        FOREIGN KEY (manager_id)
            REFERENCES employee (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

ALTER TABLE role
    ADD CONSTRAINT department_id
        FOREIGN KEY (department_id)
            REFERENCES department (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;


-- SELECT role_id,role_title, role_salary, department_name
-- FROM departments INNER JOIN role
--                 ON department.id = role.department_Id

-- SELECT employee_id,employee_first_name, employee_last_name,employee_role_id,employee_manager_id 
-- FROM role INNER JOIN employee
--                 ON role.department_id = employees.department_Id