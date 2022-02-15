const mongoose = require('mongoose');
const Team = require('../../../../models/team');
const User = require('../../../../models/user');
const { AppError } = require('../../../../common/error/error');
const {
  createTeamSchema,
  updateTeamSchema,
} = require('../../../../validators/team');
const findUserByCode = require('../../../../common/utils/findUserByCode');

module.exports = {
  getTeams: async (name, email) => {
    const teams = await Team.find({
      name: { $regex: new RegExp(name || '', 'i') },
      email_to_contact: { $regex: new RegExp(email || '', 'i') },
    });
    const teamsWithNumMem = await Promise.all(
      teams.map(async (team) => {
        const numberTeamMember = await User.find({ team_id: team._id }).count();
        const cleanedTeam = { id: team._id, ...team._doc, numberTeamMember };
        delete cleanedTeam._id;
        delete cleanedTeam.__v;
        return cleanedTeam;
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
      teamData.user_codes.map((code) => findUserByCode(code))
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
    const cleanedTeamMembers = teamMembers.map((member) => {
      const cleanedMember = { id: member._id, ...member._doc };
      delete cleanedMember._id;
      return cleanedMember;
    });
    const cleanedTeam = { id: team._id, ...team._doc, cleanedTeamMembers };
    delete cleanedTeam._id;
    return cleanedTeam;
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
  updateTeam: async (teamId, email_to_contact, name) => {
    const { error, value } = updateTeamSchema.validate({
      email_to_contact,
      name,
    });
    if (error) {
      throw new AppError(400, 'Invalid input data');
    }
    if (teamId.length !== 24) {
      // mongo object id length: 24
      throw new AppError(400, 'Invalid Object Id');
    }
    const team = await Team.findById(teamId);
    if (!team) {
      throw new AppError(404, 'Team not found');
    }
    team.email_to_contact = email_to_contact || team.email_to_contact;
    team.name = name || team.name;
    return team.save();
  },
};
