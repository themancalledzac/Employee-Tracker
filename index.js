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
                "1. View Menu",
                "2. Create Menu",
                "3. Update Menu",
                "4. Delete Menu",
                "5. Exit Application"
            ]
        })
        .then((res) => {

            switch (res.action) {

                case "1. View Menu":
                    viewMenu();
                    return;

                case "2. Create Menu":
                    createMenu();
                    return;

                case "3. Update Menu":
                    updateMenu();
                    return;

                case "4. Delete Menu":
                    deleteMenu();
                    return;

                default:
                    connection.end();
            }
        })
};


function viewMenu() {

    inquirer
        .prompt({
            message: "Choose something",
            name: "action",
            type: "list",
            choices: [
                "1. View Departments",
                "2. View Roles",
                "3. View Employees",
                "4. View Employees by Manager",
                "5. Go back to the main menu"

            ]
        })
        .then((res) => {

            switch (res.action) {

                case "1. View Departments":
                    viewDepartments();
                    return;

                case "2. View Roles":
                    viewRoles();
                    return;

                case "3. View Employees":
                    viewEmployees();
                    return;

                case "4. View Employees by Manager":
                    employeesByManager();
                    return;

                case "5. Go back to the main menu":
                    initialMenu();
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
    initialMenu();
    // something
};

function createMenu() {

    inquirer
        .prompt({
            message: "What do you want to create?",
            name: "action",
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
    initialMenu();
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
                        name: "action",
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
    initialMenu();
};

function updateMenu() {

    inquirer
        .prompt({
            message: "What are we updating?",
            name: "action",
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
    initialMenu();
};

// update an employee's manager
function updateEmployeeManager() {
    initialMenu();
};


function deleteMenu() {

    inquirer
        .prompt({
            message: "What are we deleting?",
            name: "action",
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
    initialMenu();
};

function deleteRole() {
    initialMenu();
};

function deleteEmployee() {
    initialMenu();
};


// remove employee

// update
initialMenu();