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

module.exports.addStudent = async (req, res) => {
  try {

        const studentSchema = Joi.object({
            student_name: Joi.string().required(),
            student_dob: Joi.date().required(),
            student_gender: Joi.string().valid('male', 'female', 'other').required(),
            student_email: Joi.string().email().required(),
            student_phone: Joi.string().length(10),
        });
    
        // Validate incoming request body
        const { error, value } = studentSchema.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 'error',
            message: error.details[0].message,
          });
        }
      const datetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

    // Insert new user record into the database
    const addStudent = await knex('students').insert({
      student_name: req.body.student_name,
      student_dob: req.body.student_dob,    
      student_gender: req.body.student_gender,    
      student_email: req.body.student_email,    
      student_phone: req.body.student_phone,  
      created_at: datetime,
      updated_at: datetime,
    });

    // Retrieve the newly added user data from the database
    const StudentData = await knex('students')
      .select('*')
      .where('id', addStudent[0]);

    // Return a JSON response with the newly added user data
    return res.status(200).json({
      status: 'success',
      message: 'user added successfully.',
      content: StudentData[0]
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
}; 

module.exports.deleteStudent = async (req, res) => {
  try {
    // Delete user record from the database
    const deleteUser = await knex('students')
      .where('id', req.params.id)
      .delete();

    // Check if a user record was deleted
    if (deleteUser === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    // Return a success response
    return res.status(200).json({
      status: 'success',
      message: 'Student deleted successfully.',
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};

module.exports.getStudent = async (req, res) => {
try {
  // Retrieve all students from the database
  let query = req.params.id ?knex('students').select('*').where('id',req.params.id).first() : knex('students').select('*');

  
  const students = await query;

  // Return a JSON response with the students data
  return res.status(200).json({
    status: 'success',
    message: 'All students retrieved successfully.',
    content: students
  });
} catch (err) {
  console.log(err);
  return res.status(500).json({
    status: 'Error',
    message: err
  });
}
}; 

module.exports.updateStudent = async (req, res) => {
  try {

    const StudentSchema = Joi.object({
        student_name: Joi.string(),
        student_dob: Joi.date().required(),
        id: Joi.required(),
        student_gender: Joi.string().valid('male', 'female', 'other'),
        student_email: Joi.string().email(),
        student_phone: Joi.string().length(10),
      });
      

    // Validate incoming request body
    const { error, value } = StudentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }
    // Get the ID of the student to update
    const id = req.body.id;

    // Update the student record in the database
    const updatedStudent = await knex('students')
      .where('id', id)
      .update({
        student_name: req.body.student_name,
        student_dob: req.body.student_dob,    
        student_gender: req.body.student_gender,    
        student_email: req.body.student_email,    
        student_phone: req.body.student_phone,
      });

    // Get the updated student data from the database
    const studentData = await knex('students')
      .select('*')
      .where('id', id);

    // Return a JSON response with the updated student data
    return res.status(200).json({
      status: 'success',
      message: 'student updated successfully.',
      content: studentData[0]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};

module.exports.editStudent = async (req, res) => {
  try {
    const { id } = req.query;
    const students = await knex('students').select('*').where('id', id).first();

    if (!students) {
      return res.status(404).json({
        status: 'error',
        message: 'students not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'student retrieved successfully.',
      content: students
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
};

