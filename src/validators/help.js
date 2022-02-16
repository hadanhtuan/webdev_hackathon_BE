const joi = require('joi');

const helpSchema = joi.object({
  title: joi.string().empty('').required(),
  content: joi.string().empty('').required(),
});

module.exports = {
  helpSchema
};
