const express = require('express');
const req = require('express/lib/request');
const { AppError } = require('../../../../common/error/error');
const User = require('../../../../models/user');

async function getUsers({ username, email, fullname, student_id }) {
  let query = User.find({ role: { $ne: 'admin' } });

  if (username != null && username !== '') {
    query = query.regex('username', new RegExp(username, 'i'));
  }
  if (email != null && email !== '') {
    query = query.regex('email', new RegExp(email, 'i'));
  }
  if (fullname != null && fullname !== '') {
    query = query.regex('fullname', new RegExp(fullname, 'i'));
  }
  if (student_id != null && student_id !== '') {
    query = query.regex('student_id', new RegExp(student_id, 'i'));
  }

  const users = await query.exec();

  const newUsers = users.map((user) => {
    const newUser = { id: user._id, ...user._doc };
    delete newUser._id;
    delete newUser.password;
    delete newUser.__v;
    return newUser;
  });

  return newUsers;
}

async function getUser(id) {
  try {
    if (!id || id.length !== 24) {
      throw new AppError(400, 'Not a valid id');
    }
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const cleanedUser = { id: user._id, ...user._doc };
    delete cleanedUser._id;
    delete cleanedUser.__v;
    delete cleanedUser.password;
    return cleanedUser;
  } catch (err) {
    throw new AppError(500, err.message);
  }
}

module.exports = {
  getUsers,
  getUser,
};
