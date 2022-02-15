const userService = require('./user.service');
const { AppError } = require('../../../common/error/error');

async function getUser(req, res, next) {
  try {
    const user = { id: req.body.user._id, ...req.body.user._doc };
    delete user._id;
    delete user.password;
    delete user.__v;
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const DTO = await userService.updateUser(req.body);
    res.status(200).json({
      message: 'Update successful',
    });
  } catch (err) {
    next(err);
  }
}

async function getTeam(req, res, next) {
  try {
    const DTO = await userService.getTeam(req.body);
    res.status(200).json(DTO.team);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  updateUser,
  getTeam,
};
