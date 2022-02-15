const Team = require('../../../../models/team');
const User = require('../../../../models/user');
const { AppError } = require('../../../../common/error/error');
const { createTeamSchema } = require('../../../../validators/team');

module.exports = {
  getTeams: async (name, email) => {
    if (!name) {
      name = '';
    }
    if (!email) {
      email = '';
    }

    return Team.find({
      name: { $regex: new RegExp(name, 'i') },
      email: { $regex: new RegExp(email, 'i') },
    });
  },
  createTeam: async (teamData) => {
    const { error, value } = createTeamSchema.validate(teamData);
    if (error) {
      throw new AppError(400, 'Invalid input data');
    }
    const users = await Promise.all(
      teamData.user_codes.map((code) => {
        return findUserByCode(code);
      })
    );

    const team = new Team({
      email_to_contact: teamData.email_to_contact,
      name: teamData.name,
    });
    const teamDoc = await team.save();

    const changeUserTeamPromises = users.map((user) => {
      user.team_id = teamDoc._id;
      return user.save();
    });

    await Promise.all(changeUserTeamPromises);
    return teamDoc;
  },
};

const findUserByCode = async (code) => {
  const user = await User.findOne({ user_code: code });
  if (!user) {
    throw new AppError(400, 'Invalid user code');
  }
  return user;
};
