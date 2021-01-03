// DB folder that holds all our interactions adn connections with the mysql database
// 
// we then IMPORT that connection object
const connection = require("./connection");

// object methods to help us define all the different interactions that we want to be able
// -to do with the mysql database
// these are different functions we are exporting as an OBJECT
module.exports = {
    getDepartments() {
        return connection.query("SELECT * FROM department");
    },
    getRoles() {
        return connection.query("SELECT * FROM role");
    },
    getEmployees() {
        return connection.query("SELECT * FROM employee");
    },
    createDepartment(data) {
        return connection.query("INSERT INTO department SET ?", data);
    },
    insertRole(data) {
        return connection.query("INSERT INTO role SET ?", data);
    },
    createEmployee(data) {
        return connection.query("INSERT INTO employee SET ?", data);
    },
    deleteDepartment(data) {
        return connection.query("DELETE FROM department WHERE department_id=?", data);
    },
    selectEmployeesByDepartment(data) {
        return connection.query("SELECT * FROM employee WHERE role=?", data);
    }
}