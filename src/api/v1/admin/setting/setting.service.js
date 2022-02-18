const Setting = require('../../../../models/setting');
const { AppError } = require('../../../../common/error/error');
const {
  patchAllowSubmissionSchema,
} = require('../../../../validators/setting');

const getAllowLinkSubmission = async () => {
  const setting = await Setting.findOne({});
  if (!setting) {
    throw new AppError(500, 'Setting not found');
  }
  return setting.allow_update_link_submission;
};

const updateAllowLinkSubmission = async (allow_update_link_submission) => {
  const { error, value } = patchAllowSubmissionSchema.validate({
    allow_update_link_submission,
  });
  if (error) {
    throw new AppError(400, 'Invalid input data');
  }
  const setting = await Setting.findOne({});
  if (!setting) {
    throw new AppError(500, 'Setting not found');
  }
  setting.allow_update_link_submission = allow_update_link_submission;
  return setting.save();
};

module.exports = {
  getAllowLinkSubmission,
  updateAllowLinkSubmission,
};
