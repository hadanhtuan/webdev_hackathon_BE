const express = require('express');
const {
  loginUserSchema,
  signupUserSchema,
  updateUserSchema,
} = require('../../../validators/user');

const { linkSchema } = require('../../../validators/team');

const { helpSchema } = require('../../../validators/help');

const { AppError } = require('../../../common/error/error');
const User = require('../../../models/user');
const Team = require('../../../models/team');
const Setting = require('../../../models/setting');
const Help = require('../../../models/help');
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

  let user = body.user;
  let hash;

  if (body.password) {
    let salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(body.password, salt);
    if (hash.err) throw err;
  }

  user.password = hash || user.password;
  user.email = body.email || user.email;
  user.fullname = body.fullname || user.fullname;
  user.school = body.school || user.school;
  user.major = body.major || user.major;
  user.student_id = body.student_id || user.student_id;
  user.phone_number = body.phone_number || user.phone_number;
  user.facebook = body.facebook || user.facebook;
  user.short_introduction = body.short_introduction || user.short_introduction;
  user.personal_registration =
    body.personal_registration || user.personal_registration;

  await user.save();
  return;
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

async function updateLS(body) {
  const { error, value } = linkSchema.validate({
    link_submission: body.link_submission,
  });

  if (error) {
    throw new AppError(400, 'Not a valid link');
  }

  const allowUpdate = await Setting.findOne({});

  if (!allowUpdate.allow_update_link_submission) {
    return false;
  }

  if (!body.user.team_id) {
    throw new AppError(404, 'User have not in team');
  }
  const team = await Team.findById(body.user.team_id);
  console.log(team);
  team.link_submission = body.link_submission;

  await team.save();
  return true;
}

async function postHelp(body) {
  const { error, value } = helpSchema.validate({
    title: body.title,
    content: body.content,
  });

  if (error) {
    throw new AppError(400, 'Not a valid input');
  }

  await Help.create({
    user_id: body.user._id,
    title: body.title,
    content: body.content,
  });
}

async function getHelp(user) {
  const helps = await Help.find({ user_id: user._id }).select('-__v');
  const cleanedHelps = helps.map((help) => {
    const cleanedHelp = { id: help._id, ...help._doc };
    delete cleanedHelp._id;
    return cleanedHelp;
  });
  return cleanedHelps;
}

module.exports = {
  updateUser,
  getTeam,
  updateLS,
  postHelp,
  getHelp,
};
