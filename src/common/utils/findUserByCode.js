const User = require('../../models/user');
const { AppError } = require('../error/error');

const findUserByCode = async (code) => {
  const user = await User.findOne({ user_code: code });
  if (!user) {
    throw new AppError(400, 'Invalid user code');
  }
  return user;
};

module.exports = findUserByCode;
