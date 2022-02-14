const { loginUserSchema } = require('../../../../validators/user');
const AppError = require('../../../../common/error/error');
const User = require('../../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  login: async (username, password) => {
    const { error, value } = loginUserSchema.validate({ username, password });
    if (error) {
      throw new AppError(400, 'Invalid username or password');
    }
    const user = await User.findOne(username);
    if (!user) {
      throw new AppError(404, 'Admin not found');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new AppError(401, 'Wrong username or password');
    }
    return user;
  },
  createToken: (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET);
  },
};
