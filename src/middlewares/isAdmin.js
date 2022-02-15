const jwt = require('jsonwebtoken');
const { AppError } = require('../common/error/error');
const User = require('../models/user');
require('dotenv').config();

const isAdmin = async (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
      throw new AppError(401, 'Not authorized');
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(id);

    if (!user) {
      throw new AppError(404, 'Admin not found');
    }

    if (user.role !== 'admin') {
      throw new AppError(401, 'Not authorized');
    }

    req.body.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAdmin;
