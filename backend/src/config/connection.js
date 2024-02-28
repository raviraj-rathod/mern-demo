
const mysql = require('mysql')
const ENV = require('../../env');
//const ENV = require('./config');
var mysqlConnection = mysql.createConnection({
  host: ENV.host,
  user: ENV.user,
  password: ENV.password,
  database: ENV.database,
})

mysqlConnection.connect((err)=>{
  if (err) throw err
  return console.log(mysqlConnection.config.database , "database is connected successfully")
}) 


module.exports = mysqlConnection