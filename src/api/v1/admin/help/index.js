const router = require('express').Router();
const helpController = require('./help.controller');

router.get('/', helpController.getHelps);

module.exports = router;
