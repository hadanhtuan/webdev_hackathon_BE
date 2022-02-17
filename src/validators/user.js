const joi = require('joi');

const loginUserSchema = joi.object({
  username: joi.string().empty('').required(),
  password: joi.string().empty('').required(),
});

const signupUserSchema = joi.object({
  username: joi.string().empty('').required(),
  email: joi.string().empty('').email().required(),
  password: joi.string().empty('').required(),
  fullname: joi.string().empty('').required(),
  school: joi.string().empty('').required(),
  major: joi.string(),
  student_id: joi.string().empty('').required(),
  phone_number: joi.string().required(),
  facebook: joi.string().empty('').required(),
  short_introduction: joi.string(),
  personal_registration: joi.boolean().required(),
});

const updateUserSchema = joi.object({
  email: joi.string().empty('').email(),
  password: joi.string().empty(''),
  fullname: joi.string().empty(''),
  school: joi.string().empty(''),
  major: joi.string().allow(''),
  student_id: joi.string().empty(''),
  phone_number: joi.string().empty(''),
  facebook: joi.string().empty(''),
  short_introduction: joi.string().allow('', null),
  personal_registration: joi.boolean(),
});

const adminUpdateUserSchema = joi.object({
  fee_status: joi.boolean(),
  note_by_admin: joi.string().allow('', null),
});

const emailSchema = joi.object({
  email: joi.string().empty('').email().required(),
});

const  passwordSchema = joi.object({
  password: joi.string().empty('').required()
});

module.exports = {
  loginUserSchema,
  signupUserSchema,
  updateUserSchema,
  adminUpdateUserSchema,
  emailSchema,
  passwordSchema
};
