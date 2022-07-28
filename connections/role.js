class Role {

    constructor(empRole, id=0, title="", salary= 0.00, department_id){
        this.empRole = empRole;
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id= department_id;
    }

    setAttributes(data) {
        Object.getOwnPropertyNames(this).forEach((attribute)=>{
            if(attribute !== "empRole"){
                this[attribute] = data[attribute];
            }
        })
    }

    viewRoles()
    {
        this.empRole.query
        (
            "SELECT role.id, role.title,dept.name, role.salary " +
            "FROM role role" +
            "LEFT JOIN department dept ON role.department_id = dept.id",
            function (err, res) 
            {
                if (err)
                {console.log(err)}
                console.log("--------------------")
                console.table(res);
            }
            
        )
    }

    addRole(title= this.title, salary = this.salary, department_id= this.department_id){
        this.empRole.query("INSERT INTO role (title, salary, department_id VALUES (?,?,?)" [ title, salary, department_id],
        function (err, res){
            if (err)
            {console.log(err);}
        })
    }
}

module.exports = Role;