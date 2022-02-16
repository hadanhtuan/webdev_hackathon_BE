const helpService = require('./help.service');

const getHelps = async (req, res, next) => {
  try {
    const helps = await helpService.getHelps();
    res.status(200).json({
      helps,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHelps,
};
