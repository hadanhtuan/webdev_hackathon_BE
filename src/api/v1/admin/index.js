const router = require('express').Router();

const auth = require('./auth');
const teams = require('./teams');
const users = require('./users');
const help = require('./help');
const isAdmin = require('../../../middlewares/isAdmin');

router.use('/auth', auth);
router.use('/users', isAdmin, users);

router.use('/teams', isAdmin, teams);
router.use('/help', isAdmin, help);

module.exports = router;
