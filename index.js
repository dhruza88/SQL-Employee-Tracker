// import inquirer from 'inquirer';
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags, addListener } = require('process');
const Employee = require("./connections/employee");
const Role = require("./connections/role");
const Department = require("./connections/department");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
);

let employee = new Employee(db);
let role = new Role(db);
let department = new Department(db);

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Running nodemon in the npm start script caused this issue for me.
// I had this:
// "scripts": { "start": "nodemon --exec babel-node index.js" }
// Changed it to this. Now my keypresses work as expected:
// "scripts": { "start": "babel-node index.js" }

// Same issue here, nodemon was the culprit as soon as I changed it to

// "scripts": { "start": "node index.js" }

// it worked as expected.

function start() {
    let question = "What would you like to do?"
    let options = [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"


    ];
    try {
        inquirer.prompt(
            {
                name: "action",
                type: "list",
                message: question,
                choices: options
            }
        ).then((data) => {
            switch (data.action) {
                case "View All Employees":
                    employee.findEmployee();
                    start();
                    break;
                case "Add Employee":
                    addEmployee();
                    start();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    role.viewRoles();
                    start();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    department.viewDepts();
                    start();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Exit":
                    console.log("Goodbye.");
                    break;
                // default:
                //     console.log(`Action (${data.action}) is not supported.`);
                //     start();
            }
        })
    }
    catch (err) {
        console.log("unable to run inquirer prompt");
        console.log(err);
    }

}

function addDept() {
    let question = "What department would you like to add?";
    inquirer.prompt(
        {
            name: "department",
            type: "input",
            message: question
        }
    ).then((data) => {
        department.addDept(data.department);
        start();
    });
}

function addRole() {
    let depts = ["No Dept"];
    db.query("SELECT * FROM department",
        function (err, res) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].name) {
                    depts.push(res[i].name);
                }
            }

            let questions = [
                "What is the role title you would like to add?",
                "What is the role salary?",
                "What is the role department?"
            ];

            // let promptObj = [];
            // questions.forEach((question, indx) => {
            //     const curObj = indx === questions.length -1 ?
            //         {
            //             name: "title",
            //             type: "input",
            //             message: question
            //         } :
            //         {
            //             name: "title",
            //             type: "list",
            //             message: question,
            //             choices: departments
            //         };
            //     promptObj.push(curObj);
            // });
            // inquirer.prompt(promptObj).then();

            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: questions[0]
                },
                {
                    name: "salary",
                    type: "number",
                    message: questions[1]
                },
                {
                    name: "department",
                    type: "list",
                    message: questions[2],
                    choices: depts
                }

            ]).then((data) => {
                let deptid = null;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].name === data.department) {
                        deptid = res[i].id;
                        break;
                    }
                }
                role.addRole(data.title, data.salary, deptid);
                start();
            });
        })
}

function addEmployee() {
    let roles = ["No Role"];
    let managers = ["No Manager"];
    db.query("SELECT * FROM role ",
        function (err, roleRes) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < roleRes.length; i++) {
                if (roleRes[i].title) {
                    roles.push(roleRes[i].title);
                }
            }

            db.query("SELECT * from employee ",
                function (Err, empRes) {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < empRes.length; i++) {
                        if (empRes[i].first_name) {
                            managers.push(empRes[i].first_name + " " + empRes[i].last_name);
                        }
                    }

                    let questions = [
                        "What is the employee first name?",
                        "What is the employee last name?",
                        "What is the employee role?",
                        "Who is the employee manager?"
                    ];
                    // let questionsObj = [
                    //     {
                    //         name: 'firstName',
                    //         message: 'What is the employee first name?',
                    //         type: 'input'
                    //     },
                    //     {
                    //         name: 'lastName',
                    //         message: 'What is the employee last name?',
                    //         type: 'input'
                    //     },
                    //     {
                    //         name: 'role',
                    //         message: 'What is the employee role?',
                    //         type: 'list'
                    //     },
                    //     {
                    //         name: 'manager',
                    //         message: 'Who is the employee manager?',
                    //         type: 'list'
                    //     },
                    // ];
                    // inquirer.prompt(questionsObj).then(() => {

                    // });

                    inquirer.prompt([
                        {
                            name: "firstName",
                            type: "input",
                            message: questions[0]
                        },
                        {
                            name: "lastName",
                            type: "input",
                            message: questions[1]
                        },
                        {
                            name: "role",
                            type: "list",
                            message: questions[2],
                            choices: roles
                        },
                        {
                            name: "manager",
                            type: "list",
                            message: questions[3],
                            choices: managers
                        }
                    ]).then((data) => {
                        let roleId = null;
                        for (let i = 0; i < roleRes.length; i++) {
                            if (roleRes[i].title === data.role) {
                                roleId = roleRes[i].id;
                                break;
                            }
                        }

                        let managerId = null;
                        for (let i = 0; i < empRes.length; i++) {
                            if (empRes[i].first_name + " " + empRes[i].last_name === data.manager) {
                                managerId = empRes[i].id;
                                break;
                            }
                        }
                        employee.addEmployee(data.firstName, data.lastName, roleId, managerId);
                        start();
                    });
                })


        }
    )
}

function updateEmployeeRole() 
{
    let roles = ["No Role"];
    let employees = [];
    db.query("SELECT * FROM role ",
        function (err, roleRes) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < roleRes.length; i++) {
                if (roleRes[i].title) {
                    roles.push(roleRes[i].title);
                }
            }
            db.query("SELECT * FROM employee ",
                function (err, empRes) {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < empRes.length; i++) {
                        employees.push(empRes[i].first_name + " " + empRes[i].last_name);
                    }

                    let questions = [
                        "Who's role would you like to change",
                        "What is their new role"
                    ];
                    inquirer.prompt([
                        {
                            name: "employee",
                            type: "list",
                            message: questions[0],
                            choices: employees
                        },
                        {
                            name: "role",
                            type: "list",
                            message: questions[1],
                            choices: roles
                        }
                    ]).then((data) => {
                        let roleId = null;
                        for (let i = 0; i < roleRes.length; i++) {
                            if (roleRes[i].title === data.role) {
                                roleId = roleRes[i].id;
                                break;
                            }
                        }
                        for (let i = 0; i < empRes.length; i++) {
                            if (empRes[i].first_name + " " + empRes[i].last_name === data.employee) {
                                employee.setAttributes(empRes[i]);
                                employee.role_id = roleId;
                                employee.updateEmployee();
                                break;
                            }
                        }
                        start();
                    });

                })
        });
    }

    app.use((req, res) => {
        res.status(404).end();
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        start();
    });


