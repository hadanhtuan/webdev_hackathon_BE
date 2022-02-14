const router = require('express').Router();

const authController = require('./auth.controller');

router.get('/login', authController.login);

module.exports = router;
