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

const updateHelp = async (req, res, next) => {
  try {
    const { processing_status, reply_by_admin } = req.body;
    const { id } = req.params;
    await helpService.updateHelp(id, { processing_status, reply_by_admin });
    res.status(200).json({
      message: 'Update successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHelps,
  updateHelp,
};
