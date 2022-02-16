const router = require('express').Router();
const helpController = require('./help.controller');

router.get('/', helpController.getHelps);
router.patch('/:id', helpController.updateHelp);

module.exports = router;
