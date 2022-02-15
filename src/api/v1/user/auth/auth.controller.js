const express = require('express');
const authService = require('./auth.service');

async function login(req, res, next) {
  try {
    const DTO = await authService.login(req.body);
    const user = { id: DTO.user._id, ...DTO.user._doc };
    delete user._id;
    delete user.__v;
    delete user.password;
    res.status(200).json({
      token: DTO.token,
      user,
    });
  } catch (err) {
    next(err);
  }
}

async function signup(req, res, next) {
  try {
    const DTO = await authService.signup(req.body);
    const user = { id: DTO.user._id, ...DTO.user._doc };
    delete user._id;
    delete user.__v;
    delete user.password;
    res.status(201).json({
      token: DTO.token,
      user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  signup,
};
