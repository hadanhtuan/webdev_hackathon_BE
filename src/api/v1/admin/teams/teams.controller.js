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
};
