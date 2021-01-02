const inquirer = require("inquirer");

// this require db is meant to search the db folder to-
// -find an index.js file.
const db = require("./db");
// this removes the connection info from our main file, and-
// hides it in our db folder away from prying eyes
// const connection = require("./db/connection");
const connection = require("./db/connection");

// break up the start into an intial menu that further breaks down, so as not to have too many options from the start.
function initialMenu() {

    inquirer
        .prompt({
            message: "View, create, update, or delete?",
            name: "action",
            type: "list",
            choices: [
                "VIEW_MENU",
                "CREATE_MENU",
                "UPDATE_MENU",
                "DELETE_MENU",
                "QUIT"
            ]
        })
        .then((res) => {

            switch (res.action) {

                case "VIEW_MENU":
                    viewMenu();
                    return;

                case "CREATE_MENU":
                    createMenu();
                    return;

                case "UPDATE_MENU":
                    updateMenu();
                    return;

                case "DELETE_MENU":
                    deleteMenu();
                    return;

                default:
                    connection.end();
            }
        })
};


function viewMenu() {

    console.log("hello");
    inquirer
        .prompt({
            message: "Choose something",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENTS",
                "VIEW_ROLES",
                "VIEW_EMPLOYEES",
                "EMPLOYEES_BY_MANAGER",
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

                case "EMPLOYEES_BY_MANAGER":
                    employeesByManager();
                    return;
            }

        })
};

function viewDepartments() {

    db
        .getDepartments()
        .then((results) => {
            console.table(results);
            initialMenu();
        });
};
function viewRoles() {

    db
        .getRoles()
        .then((results) => {
            console.table(results);
            initialMenu();
        });
};
function viewEmployees() {

    db
        .getEmployees()
        .then((results) => {
            console.table(results);
            initialMenu();
        });
};

// view employees by manager
function employeesByManager() {
    db
    // something
};

function createMenu() {

    inquirer
        .prompt({
            message: "What do you want to create?",
            name: "create",
            type: "list",
            choices: [
                "CREATE_DEPARTMENT",
                "CREATE_ROLE",
                "CREATE_EMPLOYEE",
            ]
        })
        .then((res) => {

            switch (res.action) {

                case "CREATE_DEPARTMENT":
                    createDepartment();
                    return;

                case "CREATE_ROLE":
                    createRole();
                    return;

                case "CREATE_EMPLOYEE":
                    createEmployee();
                    return;

            }
        })
};

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
                        choices: [
                            "something"
                        ]
                    }
                ])

        })
};

// add employee
function createEmployee() {

};

function updateMenu() {

    inquirer
        .prompt({
            message: "What are we updating?",
            name: "update",
            type: "list",
            choices: [

                "UPDATE_EMPLOYEE",
                "UPDATE_EMPLOYEE_MANAGER",

            ]
        })
        .then((res) => {

            switch (res.action) {

                case "UPDATE_EMPLOYEE":
                    updateEmployee();
                    return;

                case "UPDATE_EMPLOYEE_MANAGER":
                    updateEmployeeManager();
                    return;

            }
        })
};

// update employee
// also asks to update employee manager
function updateEmployee() {

};

// update an employee's manager
function updateEmployeeManager() {

};


function deleteMenu() {

    inquirer
        .prompt({
            message: "What are we deleting?",
            name: "delete",
            type: "list",
            choices: [
                // delete department, role, manager
                "DELETE_DEPARTMENT",
                "DELETE_ROLE",
                "DELETE_EMPLOYEE",
            ]
        })
        .then((res) => {
            switch (res.action) {

                case "DELETE_DEPARTMENT":
                    deleteDepartment();
                    return;

                case "DELETE_ROLE":
                    deleteRole();
                    return;

                case "DELETE_EMPLOYEE":
                    deleteEmployee();
                    return;

            }
        })

};

// delete an entire department
// probably will need a secondary confirmation, "are you SURE?"
// do we need to force an update of department of people who's department is deleted?
// 
function deleteDepartment() {

};

function deleteRole() {

};

function deleteEmployee() {

};


// remove employee

// update
initialMenu();