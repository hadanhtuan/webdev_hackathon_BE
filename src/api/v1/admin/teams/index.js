const router = require('express').Router();
const teamsController = require('./teams.controller');

router.get('/', teamsController.getTeams);
router.post('/', teamsController.createTeam);

module.exports = router;
