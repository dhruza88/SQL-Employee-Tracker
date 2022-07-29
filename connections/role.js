class Role {

    constructor(empRole, id = 0, title = "", salary = 0.00, deptid) {
        this.empRole = empRole;
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deptid = deptid;
    }

    setAttributes(data) {
        Object.getOwnPropertyNames(this).forEach((attribute) => {
            if (attribute !== "empRole") {
                this[attribute] = data[attribute];
            }
        })
    }

    viewRoles() {
        this.empRole.query
            (
                "SELECT ro.id, ro.title,dept.name, ro.salary " +
                "FROM role ro " +
                "LEFT JOIN department dept ON ro.department_id = dept.id",
                function (err, res) {
                    if (err) { console.log(err) }
                    console.log("--------------------")
                    console.table(res);
                }

            )
    }

    addRole(title = this.title, salary = this.salary, deptid = this.deptid) {
        this.empRole.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [title, salary, deptid],
            function (err, res) {
                if (err) { console.log(err); }
            })
    }
}

module.exports = Role;