const bcrypt = require("bcryptjs");
const helper = require("../utils/helper");
const mysqlConnection = require('../config/connection');

const knex = require('../../knexConfig');
const Joi = require('joi');


const {
  buyerregisterValidation,
  sellerregisterValidation,
  adminCreateValidation,
  loginFieldValidation,
} = require("../utils/validation");
// const { schema } = require("../models/admin");

module.exports.login = async (req, res) => {
    try {
       
        const loginAdmin = await knex('admin')
        .where('email', req.body.email)
        .select('*')
        .first();
        
        if (loginAdmin) {
        const passwordIsValid = bcrypt.compareSync(req.body.password, loginAdmin.password);
        if (passwordIsValid) {
            const token = helper.generateToken(loginAdmin);
            return res.status(200).json({
            status: "Success",
            message: "Logged in successfully",
            token: token,
            user: loginAdmin
            })             
        } else {
            return res.status(401).json({
            status: "Error",
            message: "Wrong Password"
            })
        } 
        } else {
        return res.status(404).json({
            status: "error",
            message: "Invalid Email"
        })
        } 
    } catch (err) {
        return res.status(500).json({
        message: err
        })
    }
};
