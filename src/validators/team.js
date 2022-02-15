const joi = require('joi');

const createTeamSchema = joi.object({
  email_to_contact: joi.string().email().empty().required(),
  name: joi.string().empty().required(),
  user_codes: joi.array().items(joi.string()).min(1),
});

module.exports = {
  createTeamSchema,
};
