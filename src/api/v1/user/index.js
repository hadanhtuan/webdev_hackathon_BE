const router = require('express').Router();

const auth = require('./auth');
const userController = require('./user.controller');

const isUser = require('../../../middlewares/isUser');


router.get('/', isUser, userController.getUser);
router.get('/team', isUser, userController.getTeam);
router.patch('/', isUser, userController.updateUser);

router.use('/auth', auth);

module.exports = router;
