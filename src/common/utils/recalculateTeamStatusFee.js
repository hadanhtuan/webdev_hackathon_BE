const Team = require('../../models/team');
const User = require('../../models/user');

module.exports = async (teamId) => {
  if (!teamId || teamId.toString().length !== 24) {
    throw new Error('Invalid teamId');
  }
  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error('Team not found');
  }
  const team_member = await User.find({ team_id: team._id });
  team.fee_status =
    team_member.findIndex((member) => member.fee_status === false) === -1;
  return team.save();
};
