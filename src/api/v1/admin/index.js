const router = require('express').Router();
const auth = require('./auth');
const isAdmin = require('../../../middleware/isAdmin');

router.use('/auth', auth);

module.exports = router;
