const express = require('express');
const {
  loginUserSchema,
  signupUserSchema,
  updateUserSchema,
} = require('../../../validators/user');
const { AppError } = require('../../../common/error/error');
const User = require('../../../models/user');
const Team = require('../../../models/team');
const bcrypt = require('bcrypt');

async function updateUser(body) {
  const { error, value } = updateUserSchema.validate({
    email: body.email,
    password: body.password,
    fullname: body.fullname,
    school: body.school,
    major: body.major,
    student_id: body.student_id,
    phone_number: body.phone_number,
    facebook: body.facebook,
    short_introduction: body.short_introduction,
    personal_registration: body.personal_registration,
  });

  if (error) {
    console.log(error);
    throw new AppError(400, 'Invalid input');
  }

  try {
    let user = body.user;

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(body.password, salt);
    if (hash.err) throw err;

    user.password = hash;
    user.email = body.email;
    user.fullname = body.fullname;
    user.school = body.school;
    user.major = body.major;
    user.student_id = body.student_id;
    user.phone_number = body.phone_number;
    user.facebook = body.facebook;
    user.short_introduction = body.short_introduction;
    user.personal_registration = body.personal_registration;

    await user.save();
    return;
  } catch (err) {
    throw new AppError(500, err.message);
  }
}

async function getTeam(body) {
  const user = body.user;
  let team = await Team.findById(user.team_id);

  if (!team) {
    throw new AppError(404, 'User does not have team');
  }

  const users = await User.find({ team_id: user.team_id });
  const cleanedUsers = users.map((user) => {
    const cleanedUser = { id: user._id, ...user._doc };
    delete cleanedUser.password;
    delete cleanedUser._id;
    delete cleanedUser.__v;
    return cleanedUser;
  });

  const cleanedTeam = { id: team._id, ...team._doc };
  cleanedTeam.team_member = cleanedUsers;
  delete cleanedTeam._id;
  delete cleanedTeam.__v;

  return { team: cleanedTeam };
}

module.exports = {
  updateUser,
  getTeam,
};
