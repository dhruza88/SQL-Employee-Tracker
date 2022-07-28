// import inquirer from 'inquirer';
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags, addListener } = require('process');


const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//   console.log(results);
// });

// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//   console.log(results);
// });

function start() {
    let question ="What would you like to do?"
    let options = [
        "View All Employyes",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"


    ];

    inquirer.prompt(
        {
        name: "action",
        type: "list",
        message:question,
        choices: options
        }
    ).then((data) => {
        switch (data.action){
            case "View All Employees":
                findEmployee();
                start();
                break;
            case "Add Employee":
                addEmployee();
                start();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "View All Roles":
                viewRoles();
                start();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewDepts();
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


start();    

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


