const router = require('express').Router();
const isAdmin = require('../../../../middlewares/isAdmin')


const userController = require('./user.controller');

router.get('/', isAdmin, userController.getUsers);

module.exports = router;
