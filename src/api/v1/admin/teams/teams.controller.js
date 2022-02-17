const teamsService = require('./team.service');

module.exports = {
  getTeams: async (req, res, next) => {
    try {
      const { name, email } = req.query;
      const teams = await teamsService.getTeams(name, email);
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  },
  createTeam: async (req, res, next) => {
    try {
      const { email_to_contact, name, user_codes } = req.body;
      const DTO = await teamsService.createTeam({
        email_to_contact,
        name,
        user_codes,
      });

      res.status(201).json({
        message: 'Create team successful',
      });
    } catch (error) {
      next(error);
    }
  },
  getTeamById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const team = await teamsService.getTeamById(id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  },
  addUserToTeam: async (req, res, next) => {
    try {
      const { user_code } = req.body;
      const { id: teamId } = req.params;
      await teamsService.addUserToTeam(user_code, teamId);
      res.status(201).json({
        message: 'Add to team successful',
      });
    } catch (error) {
      next(error);
    }
  },
  removeUserFromTeam: async (req, res, next) => {
    try {
      const { id } = req.params;

      await teamsService.removeUserFromTeam(id);
      res.status(200).json({
        message: 'Remove from team successful',
      });
    } catch (error) {
      next(error);
    }
  },
  updateTeam: async (req, res, next) => {
    try {
      const { email_to_contact, name } = req.body;
      const { id } = req.params;
      await teamsService.updateTeam(id, email_to_contact, name);
      res.status(200).json({
        message: 'Update successful',
      });
    } catch (error) {
      next(error);
    }
  },
  deleteTeam: async (req, res, next) => {
    try {
      await teamsService.deleteTeam(req.params.id);
      res.status(200).json({
        message: 'Delete team successful',
      });
    } catch (error) {
      next(error);
    }
  },
};
