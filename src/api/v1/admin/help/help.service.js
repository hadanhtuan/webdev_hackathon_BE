const Help = require('../../../../models/help');
const Team = require('../../../../models/team');
const { helpUpdateSchema } = require('../../../../validators/help');
const { AppError } = require('../../../../common/error/error');

function sortHelpByDate(helps) {
  if (helps != null && helps.length > 0) {
    return helps.sort((help1, help2) => help2.created_at - help1.created_at);
  }
  return helps;
}

const getHelps = async (req, res, next) => {
  const helps = await Help.find()
    .select('-__v')
    .populate('user_id', '-__v -password');

  const cleanedHelps = await Promise.all(
    helps.map(async (help) => {
      const userDoc = { ...{ ...help.user_id }._doc };
      const user = { id: userDoc._id, ...userDoc };
      delete user._id;

      // if (user.team_id) {
      //   const team = await Team.findById(user.team_id).select('-__v').exec();
      //   const cleanedTeam = { id: team._id, ...team._doc };
      //   delete cleanedTeam._id;
      //   user.team = cleanedTeam;
      //   delete user.team_id;
      // }

      const cleanedHelp = { id: help._id.toString(), ...help._doc, user };
      delete cleanedHelp._id;
      delete cleanedHelp.user_id;
      return cleanedHelp;
    })
  );
  return sortHelpByDate(cleanedHelps);
};

const updateHelp = async (id, { processing_status, reply_by_admin }) => {
  const { error, value } = helpUpdateSchema.validate({
    processing_status,
    reply_by_admin,
  });
  if (error) {
    throw new AppError(400, 'Invalid input data');
  }
  if (id.length !== 24) {
    throw new AppError(400, 'Invalid id');
  }
  const help = await Help.findById(id);
  if (!help) {
    throw new AppError(404, 'Help not found');
  }
  if (processing_status !== undefined) {
    help.processing_status = processing_status;
  }
  if (reply_by_admin !== undefined) {
    help.reply_by_admin = reply_by_admin;
  }
  return help.save();
};

module.exports = {
  getHelps,
  updateHelp,
};
