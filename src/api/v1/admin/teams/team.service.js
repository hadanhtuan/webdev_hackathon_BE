const Team = require('../../../../models/team');
const User = require('../../../../models/user');
const { AppError } = require('../../../../common/error/error');
const { createTeamSchema } = require('../../../../validators/team');
const mongoose = require('mongoose');

module.exports = {
  getTeams: async (name, email) => {
    if (!name) {
      name = '';
    }
    if (!email) {
      email = '';
    }

    const teams = await Team.find({
      name: { $regex: new RegExp(name, 'i') },
      email: { $regex: new RegExp(email, 'i') },
    });
    const teamsWithNumMem = await Promise.all(
      teams.map(async (team) => {
        const numberTeamMember = await User.find({ team_id: team._id }).count();
        return { ...team._doc, numberTeamMember };
      })
    );
    return teamsWithNumMem;
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
  getTeamById: async (id) => {
    if (id.length !== 24) {
      // mongo object id length: 24
      throw new AppError(400, 'Invalid Object Id');
    }
    const team = await Team.findById(id).select('-__v');
    if (!team) {
      throw new AppError(404, 'Team not found');
    }
    const teamMembers = await User.find({ team_id: team._id })
      .select('-password -__v')
      .exec();
    return { ...team._doc, teamMembers };
  },
  addUserToTeam: async (user_code, teamId) => {
    const user = await User.findOne({ user_code });
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    if (teamId.length !== 24) {
      // mongo object id length: 24
      throw new AppError(400, 'Invalid Object Id');
    }
    const team = await Team.findById(teamId);
    if (!team) {
      throw new AppError(404, 'Team not found');
    }
    user.team_id = new mongoose.Types.ObjectId(teamId);
    return user.save();
  },
  removeUserFromTeam: async ({ teamId, user_code }) => {
    const user = await User.findOne({ user_code });
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    if (teamId.length !== 24) {
      // mongo object id length: 24
      throw new AppError(400, 'Invalid Object Id');
    }
    const team = await Team.findById(teamId);
    if (!team) {
      throw new AppError(404, 'Team not found');
    }
    user.team_id = null;
    return user.save();
  },
};

const findUserByCode = async (code) => {
  const user = await User.findOne({ user_code: code });
  if (!user) {
    throw new AppError(400, 'Invalid user code');
  }
  return user;
};
