const settingService = require('./setting.service');

const getAllowLinkSubmission = async (req, res, next) => {
  try {
    const allow_update_link_submission =
      await settingService.getAllowLinkSubmission();
    res.status(200).json({ allow_update_link_submission });
  } catch (error) {
    next(error);
  }
};

const updateAllowLinkSubmission = async (req, res, next) => {
  try {
    const { allow_update_link_submission } = req.body;
    await settingService.updateAllowLinkSubmission(
      allow_update_link_submission
    );
    res.status(200).json({
      message: 'Update successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllowLinkSubmission,
  updateAllowLinkSubmission,
};
