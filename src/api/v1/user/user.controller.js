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

async function updateLS(req, res, next) {
  try {
    const DTO = await userService.updateLS(req.body);

    if (DTO) {
      res.status(200).json({
        message: 'Update successful',
      });
    } else {
      res.status(400).json({
        message: 'Out of time',
      });
    }
  } catch (err) {
    next(err);
  }
}

async function postHelp(req, res, next) {
  try {
    const DTO = await userService.postHelp(req.body);
    res.status(200).json({
      message: 'Create successful',
    });
  } catch (err) {
    next(err);
  }
}

async function getHelp(req, res, next) {
  try {
    const { user } = req.body;
    const helps = await userService.getHelp(user);
    res.status(200).json({
      helps,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
  updateUser,
  getTeam,
  updateLS,
  postHelp,
  getHelp,
};
