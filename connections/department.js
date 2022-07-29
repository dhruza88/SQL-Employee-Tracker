class Department {

    constructor(empDept, id=0, name = "") {
        this.empDept = empDept;
        this.id = id;
        this.name = name;
    }

     viewDepts(){
        this.empDept.query(
            "Select dept.id, dept.name " +
            "From department dept ",
            function (err, res) {
                if (err) {
                    console.log(err)
                }
                console.log("--------------------")
                console.table(res);
            }
        )

    }

     addDept(departmentName = this.name ){
        this.empDept.query("INSERT INTO department (name) VALUES (?)", [departmentName] ,
            function (err, res) {
                if (err) {
                    console.log(err);
                }
            }

        )

    }
}

module.exports = Department;