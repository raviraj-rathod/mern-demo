const express = require("express");
const routes = express.Router();
const studentController = require("../controllers/studentController"); 
const { verifyToken } = require("../middelware/auth");
routes.use(verifyToken);
routes.post("/add",  studentController.addStudent);
routes.get("/delete/:id",  studentController.deleteStudent);
routes.get("/get",  studentController.getStudent);
routes.get("/get/:id",  studentController.getStudent);
// routes.get("/edit",  studentController.editStudent);
routes.post("/update",  studentController.updateStudent);

module.exports = routes;