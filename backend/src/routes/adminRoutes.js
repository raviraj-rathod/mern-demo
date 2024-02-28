const express = require("express");
const routes = express.Router();
const adminController = require("../controllers/adminController"); 

routes.post("/login",  adminController.login);

module.exports = routes;