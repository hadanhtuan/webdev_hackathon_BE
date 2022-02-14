const router = require('express').Router();
const admin = require('./admin');
const user = require('./user');

router.use('/user', user);
router.use('/admin', admin);

module.exports = router;
