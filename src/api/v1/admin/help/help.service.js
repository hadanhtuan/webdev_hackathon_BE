const Help = require('../../../../models/help');

const getHelps = async (req, res, next) => {
  const helps = await Help.find().select('-__v');

  const cleanedHelps = helps.map((help) => {
    const cleanedHelp = { id: help._id, ...help._doc };
    delete cleanedHelp._id;
    return cleanedHelp;
  });
  return cleanedHelps;
};

module.exports = {
  getHelps,
};
