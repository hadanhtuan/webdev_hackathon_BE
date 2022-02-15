const userService = require('./users.service');

async function getUsers(req, res, next) {
  try {
    const DTO = await userService.getUsers(req.query);
    res.status(200).json(DTO);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser,
};
