const Help = require('../../../../models/help');
const { helpUpdateSchema } = require('../../../../validators/help');
const { AppError } = require('../../../../common/error/error');

const getHelps = async (req, res, next) => {
  const helps = await Help.find().select('-__v');

  const cleanedHelps = helps.map((help) => {
    const cleanedHelp = { id: help._id, ...help._doc };
    delete cleanedHelp._id;
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
  help.processing_status = processing_status || help.processing_status;
  help.reply_by_admin = reply_by_admin || help.reply_by_admin;
  return help.save();
};

module.exports = {
  getHelps,
  updateHelp,
};
