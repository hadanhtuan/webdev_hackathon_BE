const router = require('express').Router();

const auth = require('./auth');
const teams = require('./teams');
const isAdmin = require('../../../middlewares/isAdmin');
const users = require('./users');

router.use('/auth', auth);
router.use('/users', isAdmin, users);

router.use('/teams', isAdmin, teams);

module.exports = router;
