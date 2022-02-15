const router = require('express').Router();
const isAdmin = require('../../../../middlewares/isAdmin')


const usersController = require('./users.controller');

router.get('/', usersController.getUsers);

module.exports = router;
