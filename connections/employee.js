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
        try {
            const queryStr = `SELECT
            empl.id, empl.first_name, empl.last_name, r.title, dept.name, r.salary,
        m.first_name AS
            manager_first_name,
        m.last_name AS
            manager_last_name
        FROM
            employee empl
        LEFT JOIN
            role r ON empl.role_id = r.id
        LEFT JOIN
            department dept ON r.department_id = dept.id
        LEFT JOIN
            employee m ON empl.manager_id = m.id`;
            this.emp.query(
                queryStr,
                function (err, res) {
                    try {
                        if (err) {
                            console.log(err);
                        }
                        console.log("--------------------");
                        console.table(res);
                    } catch (err) {
                    }
                });
        } catch (err) {
            // console.log(err);
        }
    }

    addEmployee(firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.emp.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [firstName, lastName, roleId, managerId],
            function (err, res) {
                if (err) {
                    // console.log(err);
                }
            }

        );
    }

    // updateEmployee(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {

    //     const empObj = {
    //         first_name: this.first_name,
    //         last_name: this.last_name,
    //         role_id: this.role_id,
    //         manager_id: this.manager_id
    //     };
    //     const idObj = {
    //         id: id
    //     };
    //     console.log(empObj);
    //     console.log(idObj);
    //     console.log();

    //     this.emp.query("UPDATE employee SET ? WHERE ?",
    //     [
    //         empObj,
    //         idObj
    //     ],
    //         function (err, res) {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    // }
    updateEmployee(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.emp.query("UPDATE employee SET ? WHERE ?", [
            {   first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: managerId },
                 { id: id }],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

}

module.exports = Employee;