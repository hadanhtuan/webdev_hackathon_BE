const router = require('express').Router();

const usersController = require('./users.controller');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
