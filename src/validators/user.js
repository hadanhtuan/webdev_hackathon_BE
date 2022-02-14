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
  phone_number: joi.number().required(),
  facebook: joi.string().empty('').required(),
  short_introduction: joi.string(),
  personal_registration: joi.boolean().required(),
});

const editUserSchema = joi.object({
  email: joi.string().empty('').email(),
  password: joi.string().empty(''),
  fullname: joi.string().empty(''),
  school: joi.string().empty(''),
  major: joi.string(),
  student_id: joi.string().empty(''),
  phone_number: joi.number(),
  facebook: joi.string().empty(''),
  short_introduction: joi.string(),
  personal_registration: joi.boolean(),
  fee_status: joi.boolean(),
  team_id: joi.string(),
  note_by_admin: joi.string(),
});

module.exports = {
  loginSchema,
  signupSchema,
  editUserSchema,
};
