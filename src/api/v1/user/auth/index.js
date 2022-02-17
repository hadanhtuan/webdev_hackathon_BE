const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');


router.post('/login', authController.login);
router.post('/sign-up', authController.signup);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password/:resetToken', authController.resetPassword);


module.exports = router;






