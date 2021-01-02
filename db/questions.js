const db = require("../db/index.js");

module.exports = {

    initialMenuQ() {
        return [{
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
        }]
    },

    viewMenuQ() {
        return [{
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
        }]
    },

    createMenuQ() {
        return [{
            message: "What do you want to create?",
            name: "action",
            type: "list",
            choices: [
                "CREATE_DEPARTMENT",
                "CREATE_ROLE",
                "CREATE_EMPLOYEE",
            ]
        }]
    },
};