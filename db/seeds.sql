INSERT INTO department(name)
VALUES
("IT"),
("Accounting"),
("Finance"),
("Marketing"),
("Business"),
("Operations");

INSERT INTO role (title, salary, department_id)
VALUES
("CTO", 100000,1),
("CPA", 80000,2),
("CFO", 90000,3),
("CMO", 70000,4),
("CEO", 120000,5),
("COO", 110000,6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1,"David", "Hruza", 5, null),
(2,"Jacob", "Black", 2, 1),
(3,"Jane", "Boe", 3, 1),
(4,"Jackie", "Brown", 4, 2),
(5,"Bob", "Ross", 1, 2), 
(6,"Steven", "Green", 6, 5);