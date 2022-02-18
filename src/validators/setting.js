const joi = require('joi');

const patchAllowSubmissionSchema = joi.object({
  allow_update_link_submission: joi.boolean().required(),
});

module.exports = {
  patchAllowSubmissionSchema,
};
