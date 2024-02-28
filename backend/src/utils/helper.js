const jwt = require("jsonwebtoken");
const config = require("../middelware/jwt");
const mysqlConnection = require('../config/connection')

module.exports.generateToken = function (id) {
    var token = jwt.sign({ id: id }, config.secret, {
        expiresIn: 86400,
    });
    return token;
};


module.exports.alreadyExist = async function (email, phone) {
    if (email) {       
        await mysqlConnection.query(`SELECT * FROM users WHERE email = ${mysqlConnection.escape(email)}`, function (err, result) { 
            if(result.length){
                return { msg: "email already exist"} 
            }else{
                return { msg: "email not already exist"}
                
            }
        }) 
    } 
  };