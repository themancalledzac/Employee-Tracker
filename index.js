const inquirer = require("inquirer");

// this require db is meant to search the db folder to-
// -find an index.js file.
const db = require("./db");
// this removes the connection info from our main file, and-
// hides it in our db folder away from prying eyes
const connection = require("./db/connection");



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
                "CREATE_ROLE",
                "QUIT"

            ]
        })
        .then((res) => {

            switch (res.action) {

                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    return;

                case "VIEW_ROLES":
                    return;

                case "VIEW_EMPLOYEES":
                    return;

                // case "CREATE_ROLE":
                //     createRole();
                //     return;

                default:
                    connection.end();
            }

        })
}

function viewDepartments() {

    db
        .getDepartments()
        .then((results) => {
            console.table(results);
            askForAction();
        });
}

// function createRole() {
//     db
//         .getDepartments()
//         .then((departments) => {

//             console.log(departments);

//             console.log(
//                 departments
//             )

//             // inquirer
//             //     .prompt([
//             //         {
//             //             message: "What department is this role for?",
//             //             type: "list",
//             //             choices: departments.map(department) => ({
//             //                 value: department.id,
//             //                 label: department.name
//             //             })
//             //         }
//             //     ])

//         })
// }

askForAction();