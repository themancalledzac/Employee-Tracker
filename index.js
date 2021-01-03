const inquirer = require("inquirer");

// this require db is meant to search the db folder to-
// -find an index.js file.
const db = require("./db");
// this removes the connection info from our main file, and-
// hides it in our db folder away from prying eyes
// const connection = require("./db/connection");
const connection = require("./db/connection");
const questions = require("./db/questions");

// break up the start into an intial menu that further breaks down, so as not to have too many options from the start.
// =============================INITIAL MENU====================================//
function initialMenu() {

    const initialMenuQ = [
        {
            message: "View, create, update, or delete?",
            name: "action",
            type: "list",
            choices: [
                "1. View Menu",
                "2. Create Menu",
                "3. Update Menu",
                "4. Delete Menu",
                "5. Exit Application",
            ]
        }
    ];
    inquirer
        .prompt(initialMenuQ)
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

// =============================VIEW MENU====================================//
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
    // CURRENT PROBLEM is there are no names associated with manager_id's. Who are these managers?!
    // TUTOR
    // db
    //     .getEmployees()
    //     .then((employees) => {

    //         const employeeChoice = employees.map((employee) => ({
    //             value: employee.manager_id,
    //             first_name: employee.first_name,
    //             last_name: employee.last_name
    //         }));
    //         inquirer
    //             .prompt([
    //                 {
    //                     message: "What"
    //                 }
    //             ])
    //     })
    initialMenu();
    // something
};

// =============================CREATE MENU====================================//
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

    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "What is the name of the new Department?"
        })
        .then((results) => {
            db
                .createDepartment(results)
            initialMenu();
        });
};

// add role.
//  
function createRole() {
    // first insert is what department ID
    db
        .getDepartments()
        .then((departments) => {

            const departmentChoice = departments.map((department) => ({
                value: department.department_id,
                name: department.name
            }));

            inquirer
                .prompt([
                    {
                        message: "What is the title of this new role?",
                        name: "role_title",
                        type: "input"
                    },
                    {
                        message: "What is the salary of this new role?",
                        name: "role_salary",
                        type: "input"
                    },
                    {
                        message: "\nWhat department is this role for?",
                        name: "role_department",
                        type: "list",
                        choices: departmentChoice
                    },
                ])
                .then((results) => {
                    resultsObject = {
                        title: results.role_title,
                        salary: results.role_salary,
                        department_id: results.role_department
                    }
                    db
                        .insertRole(resultsObject);
                    console.log(resultsObject);
                    initialMenu();
                });

        })
};

// add employee
function createEmployee() {

    db
        .getRoles()
        .then((roles) => {

            const roleChoice = roles.map((role) => ({
                value: role.role_id,
                name: role.title
            }));

            inquirer
                .prompt([
                    {
                        message: "What is the new Employees first name?",
                        name: "first_name",
                        type: "input"
                    },
                    {
                        message: "What is the new Employees last name?",
                        name: "last_name",
                        type: "input"
                    },
                    {
                        message: "What role does will this employee take?",
                        name: "employee_role",
                        type: "list",
                        choices: roleChoice
                    }
                ])
                .then((results) => {
                    resultsObject = {
                        first_name: results.first_name,
                        last_name: results.last_name,
                        role_id: results.employee_role
                    }
                    db
                        .createEmployee(resultsObject);
                    console.log(resultsObject);
                    initialMenu();
                });
        })
};

// =============================UPDATE MENU====================================//
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

    db
        .getEmployees()
        .then((employees) => {

            const employeeUpdate = employees.map((employee) => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            db
                .getRoles()
                .then((roles) => {

                    const roleChoice = roles.map((role) => ({
                        value: role.role_id,
                        name: role.title
                    }));

                    inquirer
                        .prompt([
                            {
                                message: "Which employee would you like to update?",
                                name: "employee_select",
                                type: "list",
                                choices: employeeUpdate
                            },
                            {
                                message: "Please update the first name",
                                name: "first_name",
                                type: "input"
                            },
                            {
                                message: "Please update the last name",
                                name: "last_name",
                                type: "input"
                            },
                            {
                                message: "Please update their new role",
                                name: "employee_role",
                                type: "list",
                                choices: roleChoice
                            },

                        ])
                        .then((results) => {
                            console.log(results);
                            db
                                .updateEmployee(results)
                            initialMenu();
                        })
                })
        })
};

// update an employee's manager
function updateEmployeeManager() {
    initialMenu();
};

// =============================DELETE MENU====================================//
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

function deleteDepartment() {

    db
        .getDepartments()
        .then((departments) => {

            const departmentChoice = departments.map((department) => ({
                value: department.department_id,
                name: department.name
                // console.log(departmentChoice);
            }));

            inquirer
                .prompt({
                    message: "What department do you want to delete?",
                    name: "department_name",
                    type: "list",
                    choices: departmentChoice
                })
                .then((results) => {
                    db
                        .deleteDepartment(results.department_name);
                    initialMenu();
                });
        })
};

function deleteRole() {

    db
        .getRoles()
        .then((roles) => {

            const roleChoice = roles.map((role) => ({
                value: role.role_id,
                name: role.title
            }))
        })
    initialMenu();
};

function deleteEmployee() {
    initialMenu();
};


// remove employee

// update
initialMenu();