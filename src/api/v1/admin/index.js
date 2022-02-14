const router = require('express').Router();

const auth = require('./auth');
const teams = require('./teams');

const isAdmin = require('../../../middleware/isAdmin');

router.use('/auth', auth);

router.use('/teams', isAdmin, teams);

module.exports = router;
