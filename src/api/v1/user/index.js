const router = require('express').Router();

const auth = require('./auth');
const userController = require('./user.controller');

const isUser = require('../../../middlewares/isUser');


router.get('/', isUser, userController.getUser);
router.get('/team', isUser, userController.getTeam);
router.post('/help', isUser, userController.postHelp);
router.patch('/', isUser, userController.updateUser);
router.patch('/team', isUser, userController.updateLS);


router.use('/auth', auth);

module.exports = router;
