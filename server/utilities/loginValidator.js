const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(10).required(),
});

module.exports.validateLogin = validator(signinSchema);
