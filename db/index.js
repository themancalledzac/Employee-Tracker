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
}