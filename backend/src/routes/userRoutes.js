const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController"); 
const { verifyToken } = require("../middelware/auth");
routes.use(verifyToken);
routes.post("/add", userController.addUser);
routes.get("/delete/:id",  userController.deleteUser);
routes.get("/get",  userController.getUser);
routes.get("/get/:id",  userController.getUser);
routes.post("/update",  userController.updateUser);

module.exports = routes;