const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11478629',
  database: 'sql11478629',
  password: 'yjUJ1Dm7vy'
});
connection.connect();
module.exports = connection;