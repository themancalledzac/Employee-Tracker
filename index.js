const inquirer = require("inquirer");

// this require db is meant to search the db folder to-
// -find an index.js file.
const db = require("./db");
// this removes the connection info from our main file, and-
// hides it in our db folder away from prying eyes
// const connection = require("./db/connection");
const connection = require("./db/connection");

// break up the start into an intial menu that further breaks down, so as not to have too many options from the start.
function start() {

    inquirer
        .prompt({
            message: "Choose your menu",
            name: "Initial_Menu",
            type: "list",
            choices: [
                "VIEW",
                "CREATE",
                "UPDATE",
                "DELETE",
            ]
        })
}


function askForAction() {

    inquirer
        .prompt({
            message: "Choose something",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENTS",
                "VIEW_ROLES",
                "VIEW_EMPLOYEES",
                "CREATE_DEPARTMENT",
                "CREATE_ROLE",
                "CREATE_EMPLOYEE",
                "UPDATE_EMPLOYEE",
                "EMPLOYEES_BY_MANAGER",
                "DELETE_DEPARTMENT",
                "QUIT"

            ]
        })
        .then((res) => {

            switch (res.action) {

                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    return;

                case "VIEW_ROLES":
                    viewRoles();
                    return;

                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    return;

                case "CREATE_DEPARTMENT":
                    createDepartment();
                    return;

                case "CREATE_ROLE":
                    createRole();
                    return;

                case "CREATE_EMPLOYEE":
                    createEmployee();
                    return;

                case "UPDATE_EMPLOYEE":
                    updateEmployee();
                    return;

                case "EMPLOYEES_BY_MANAGER":
                    employeesByManager();
                    return;

                case "DELETE_DEPARTMENT":
                    deleteDepartment();
                    return;

                default:
                    connection.end();
            }

        })
};

function viewDepartments() {

    db
        .getDepartments()
        .then((results) => {
            console.table(results);
            askForAction();
        });
}
function viewRoles() {

    db
        .getRoles()
        .then((results) => {
            console.table(results);
            askForAction();
        });
}
function viewEmployees() {

    db
        .getEmployees()
        .then((results) => {
            console.table(results);
            askForAction();
        });
}

// add department
function createDepartment() {

};

// add role.
//  
function createRole() {
    db
        .getDepartments()
        .then((departments) => {
            console.log(departments);

            inquirer
                .prompt([
                    {
                        message: "What department is this role for?",
                        type: "list",
                        choices: 
                    }
                ])

        })
};

// add employee
function createEmployee() {

};


// update employee
// also asks to update employee manager
function updateEmployee() {

};

// view employees by manager
function employeesByManager() {

};

// delete an entire department
// probably will need a secondary confirmation, "are you SURE?"
// do we need to force an update of department of people who's department is deleted?
// 
function deleteDepartment() {

};


// remove employee

// update

askForAction();