const router = require('express').Router();
const admin = require('./admin');

const user = require('./user');
// const admin = require('./admin');

router.use('/user', user);

module.exports = router;
