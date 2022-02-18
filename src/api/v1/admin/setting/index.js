const router = require('express').Router();

const settingController = require('./setting.controller');

router.get(
  '/allow-update-link-submission',
  settingController.getAllowLinkSubmission
);
router.patch(
  '/allow-update-link-submission',
  settingController.updateAllowLinkSubmission
);

module.exports = router;
