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

async function updateUser(req, res, next) {
  try {
    const { fee_status, note_by_admin } = req.body;
    const { id } = req.params;
    await userService.updateUser(
      id,
      fee_status,
      note_by_admin,
      req.body.user.role
    );
    res.status(200).json({
      message: 'Update successful',
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({
      message: 'Delete successful',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
