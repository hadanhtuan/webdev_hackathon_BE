const router = require('express').Router();

const auth = require('./auth');
const teams = require('./teams');
const isAdmin = require('../../../middleware/isAdmin');
const user = require('./user');


router.use('/auth', auth);
router.use('/users', user);

router.use('/teams', isAdmin, teams);

module.exports = router;
