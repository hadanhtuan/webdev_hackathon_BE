const Help = require('../../../../models/help');
const { helpUpdateSchema } = require('../../../../validators/help');
const { AppError } = require('../../../../common/error/error');

const getHelps = async (req, res, next) => {
  const helps = await Help.find()
    .select('-__v')
    .populate('user_id', '-__v -password');

  const cleanedHelps = helps.map((help) => {
    const userDoc = { ...{ ...help.user_id }._doc };
    const user = { id: userDoc._id, ...userDoc };
    delete user._id;
    const cleanedHelp = { id: help._id.toString(), ...help._doc, user };
    delete cleanedHelp._id;
    delete cleanedHelp.user_id;
    return cleanedHelp;
  });
  return cleanedHelps;
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
