const joi = require('joi');

const helpSchema = joi.object({
  title: joi.string().empty('').required(),
  content: joi.string().empty('').required(),
});

const helpUpdateSchema = joi.object({
  processing_status: joi.string().valid('pending', 'complete', 'cancel'),
  reply_by_admin: joi.string(),
});

module.exports = {
  helpSchema,
  helpUpdateSchema,
};
