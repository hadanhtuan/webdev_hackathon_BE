const router = require('express').Router();

const auth = require('./auth');
const userController = require('./user.controller');

const isUser = require('../../../middlewares/isUser');


router.get('/', isUser, userController.getUser);
router.use('/auth', auth);

module.exports = router;
