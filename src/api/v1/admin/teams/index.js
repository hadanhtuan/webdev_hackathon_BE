const router = require('express').Router();
const teamsController = require('./teams.controller');

router.get('/', teamsController.getTeams);
router.post('/', teamsController.createTeam);
router.get('/:id', teamsController.getTeamById);
router.post('/:id', teamsController.addUserToTeam);
router.patch('/:id', teamsController.updateTeam);
router.delete('/:id', teamsController.deleteTeam);
router.delete('/users/:id', teamsController.removeUserFromTeam);

module.exports = router;
