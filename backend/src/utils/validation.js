const Joi = require("joi");


exports.adminCreateValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
      .error(() => {
        throw Error("Name is Invalid");
      }),
    email: Joi.string()
      .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required()
      .error(() => {
        throw Error("Email is Invalid");
      }),
    password: Joi.string()
      .required()
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
      .error(() => {
        throw Error(
          " Password should contain at least 6 characters containing 1 numeric character, 1 uppercase, 1 lowercase and 1 special character.!!!"
        );
      }),
    phone: Joi.string()
      .required()
      .min(10)
      .max(10)
      .error(() => {
        throw Error(
          "only this formate accepted for phone number: 123-345-3456 !!!"
        );
      }),
});