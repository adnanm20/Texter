const mysql = require("mysql");
const dbAuth = require("./dbAuth.json")

const dbConnection = mysql.createConnection({
	host: 'localhost',
	user: dbAuth.user,
	password: dbAuth.password,
	database: 'texter'
});

dbConnection.connect();

module.exports = dbConnection;