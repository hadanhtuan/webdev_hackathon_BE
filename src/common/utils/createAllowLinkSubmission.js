const Setting = require('../../models/setting');

const createAllowLinkSubmission = async (allow = true) => {
  let setting = await Setting.findOne({});
  if (!setting) {
    setting = new Setting({ allow_update_link_submission: allow });
  }
  return setting.save();
};

module.exports = createAllowLinkSubmission;
