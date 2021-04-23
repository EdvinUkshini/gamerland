const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gamerland',
  database: 'gamerland',
  password: ''
});
connection.connect();
module.exports = connection;