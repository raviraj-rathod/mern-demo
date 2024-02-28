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

module.exports.addUser = async (req, res) => {
  try {

    const userSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      type: Joi.string().required(),
    });

    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }
    const datetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

    const plainTextPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
    const addUser = await knex('users').insert({
      username: req.body.username,
      type: req.body.type,
      password: hashedPassword,
      created_at: datetime,
      updated_at: datetime,

    });

    // Retrieve the newly added user data from the database
    const userData = await knex('users')
      .select('*')
      .where('id', addUser[0]);

    // Return a JSON response with the newly added user data
    return res.status(200).json({
      status: 'success',
      message: 'user added successfully.',
      content: userData[0]
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    // Delete user record from the database
    const deleteUser = await knex('users')
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
      message: 'user deleted successfully.',
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    console.log(req.params);
    // Retrieve all users from the database
    let query = req.params.id ? knex('users').select('*').where('id', req.params.id).first() : knex('users').select('*');


    const users = await query;

    // Return a JSON response with the users data
    return res.status(200).json({
      status: 'success',
      message: 'All users retrieved successfully.',
      content: users
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {

    const userSchema = Joi.object({
      username: Joi.string().required(),
      id: Joi.required(),
      // password: Joi.string().required(),
      type: Joi.string().required(),
    });

    // Validate incoming request body
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }
    // Get the ID of the user to update
    const id = req.body.id;
    // const plainTextPassword = req.body.password;
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
    // Update the user record in the database
    const updatedUser = await knex('users')
      .where('id', id)
      .update({
        username: req.body.username,
        type: req.body.type,
        // password: hashedPassword,
      });

    // Get the updated user data from the database
    const userData = await knex('users')
      .select('*')
      .where('id', id);

    // Return a JSON response with the updated user data
    return res.status(200).json({
      status: 'success',
      message: 'user updated successfully.',
      content: userData[0]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await knex('users').select('*').where('id', id).first();

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'user retrieved successfully.',
      content: user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
};

