const express = require('express');
const req = require('express/lib/request');
const { AppError } = require('../../../../common/error/error');
const User = require('../../../../models/user');
const Team = require('../../../../models/team');
const { adminUpdateUserSchema } = require('../../../../validators/user');
const recalculateTeamStatusFee = require('../../../../common/utils/recalculateTeamStatusFee');
const Help = require('../../../../models/help');

function sortUsersByCreatedDate(users) {
  if (users != null && users.length > 0) {
    return users.sort((user1, user2) => user2.created_at - user1.created_at);
  }
  return users;
}

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
  return sortUsersByCreatedDate(newUsers);
}

async function getUser(id) {
  if (!id || id.length !== 24) {
    throw new AppError(400, 'Not a valid id');
  }
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const team = await Team.findById(user.team_id).select('-__v');

  let cleanedTeam;
  if (team) {
    cleanedTeam = { id: team._id, ...team._doc };
    delete cleanedTeam._id;
  }

  const cleanedUser = { id: user._id, ...user._doc, team: cleanedTeam };
  delete cleanedUser._id;
  delete cleanedUser.__v;
  delete cleanedUser.password;
  delete cleanedUser.team_id;
  return cleanedUser;
}

async function updateUser(userId, fee_status, note_by_admin) {
  if (userId.length !== 24) {
    throw new AppError(400, 'Invalid Id');
  }
  const { error, value } = adminUpdateUserSchema.validate({
    fee_status,
    note_by_admin,
  });

  if (error) {
    throw new AppError(400, 'Invalid Input');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (fee_status !== undefined) {
    user.fee_status = fee_status;
  }
  if (note_by_admin !== undefined) {
    user.note_by_admin = note_by_admin;
  }

  const userDoc = await user.save();
  if (user.team_id) await recalculateTeamStatusFee(user.team_id);
  return userDoc;
}

async function deleteUser(userId) {
  if (userId.length !== 24) {
    throw new AppError(400, 'Invalid Id');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'user not found');
  }
  const teamId = user.team_id;
  await User.findByIdAndDelete(userId);
  await Help.deleteMany({ user_id: userId });
  if (teamId) {
    await recalculateTeamStatusFee(teamId);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
