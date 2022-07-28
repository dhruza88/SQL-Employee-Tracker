const Department = require("./Department.js");
const Role = require("./Role.js");


class Employee {

    constructor(emp, id = 0, firstName = "", lastName = "", roleId = 0, managerId = 0) {
        this.emp = emp;
        this.id = id;
        this.first_name = firstName;
        this.last_name = lastName;
        this.manager_id = managerId;
    }

    setAttributes(data) {
        Object.getOwnPropertyNames(this).forEach((attribute) => {
            if (attribute !== "empRole") {
                this[attribute] = data[attribute];
            }
        })
    }


    findEmployee() {
        this.emp.query(
            "SELECT em.id, em.first_name, em.last_name, em.title, role.salary, mang.first_name AS manager_first_name, mang.last_name as manager_last_name " +
            "FROM employee em " +
            "LEFT JOIN role role ON em.role_id = role.id " +
            "LEFT JOIN department dept ON role.department_id = dept.id " +
            "LEFT JOIN employee em ON em.manager_id = mang.id",
            function (err, res) {
                if (err) {
                    console.log(err);
                }
                console.log("--------------------");
                console.table(res);
            }
        );

    }

    addEmployee(firstName = this.first_name, lastName = this.last_name, managerId = this.manager_id) {
        this.emp.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [firstName, lastName, roleId, managerId],
            function (err, res) {
                if (err) {
                    console.log(err);
                }
            }

        );
    }

    updateEmployee(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.emp.query("UPDATE employee SET ? WHERE ?", [{
            first_name: firstName,
            last_name: lastName,
            role_id: roleId,
            manager_id: managerId
        }, {id: id}],
        function (err, res) {
            if (err){
                throw err;
            }
        });
    }

}

module.exports = Employee;