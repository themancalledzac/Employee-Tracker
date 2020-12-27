// this file is just in charge of establishing our connection and creating -
// that connection object

const util = require("util");
const mysql = require("mysql");
// const inquirer = require("inquirer");
// const ascii_art = require("ascii-art");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "PurpleOllie23",
    database: "employeeDB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;



// connection.query("", function (err, res) {

// });

// connection.query("")
//     .then((res) => {

//     })
//     .catch(() => {

//     });