var jwt = require("jsonwebtoken"); 
var config = require("./jwt");
const { decode } = require("jsonwebtoken"); 
const mysqlConnection = require('../config/connection')


function verifyToken(req, res, next) {  
    var token =  req.headers['authorization'].replace('Bearer ','');
    if (!token) {
        return res.status(403).json({
            auth: false,
            message: "No token provided.",
        });
    }
    jwt.verify(token, config.secret, function (error, decoded) {
        if (error) {
            return res.status(500).json({
                auth: false,
                message: "Failed to authenticate token.",
            });
        }
        req.userId = decoded.id; 
        next();
    });
}


module.exports = { verifyToken};