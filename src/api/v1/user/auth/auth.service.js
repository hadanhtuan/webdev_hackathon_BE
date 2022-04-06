const express = require('express');
const {
  loginUserSchema,
  signupUserSchema,
  emailSchema,
  passwordSchema,
} = require('../../../../validators/user');
const { AppError } = require('../../../../common/error/error');
const User = require('../../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { required } = require('joi');
const { sendEmail } = require('../../../../common/sendEmail');

async function login(body) {
  const { error, value } = loginUserSchema.validate({
    username: body.username,
    password: body.password,
  });

  if (error) {
    console.log(error);
    throw new AppError(400, 'Invalid username or password');
  }

  const user = await User.findOne({ username: body.username });

  if (!user) {
    throw new AppError(401, 'Wrong username or password');
  }

  const passcmp = await bcrypt.compare(body.password, user.password);

  if (passcmp) {
    user.password = null;

    return {
      user: user,
      token: jwt.sign({ id: user._id }, process.env.SECRET),
    };
  } else {
    throw new AppError(401, 'Wrong username or password');
  }
}

async function signup(body) {
  const { error, value } = signupUserSchema.validate({
    username: body.username,
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
    gpa: body.gpa,
    graduation_year: body.graduation_year,
    gender: body.gender,
    date_of_birth: body.date_of_birth,
  });

  if (error) {
    console.log(error);
    throw new AppError(400, 'Invalid input');
  }

  const user = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (user) {
    throw new AppError(409, 'User or email already exit');
  }

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(body.password, salt);
  if (hash.err) throw err;

  body.password = hash;

  while(true)
  {
    body.user_code = crypto.randomBytes(4).toString('hex').toUpperCase();
    user = await User.findOne({
      user_code:  body.user_code
    })

    if(!user)
      break;
  }

  body.date_of_birth = body.date_of_birth ? new Date(body.date_of_birth) : null;

  const user2 = await User.create(body);

  user2.password = null;

  return {
    user: user2,
    token: jwt.sign({ id: user2._id }, process.env.SECRET),
  };
}

async function forgetPassword({ email }) {
  const { error, value } = emailSchema.validate({ email });

  if (error) {
    console.log(error);
    throw new AppError(400, 'Not a valid email');
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const resetToken = user.getResetPasswordToken(); //tạo reset token cho user
  await user.save();

  const resetUrl = process.env.RESET_URL + resetToken;

  const message = `
    <div style="max-width:1200px;margin: 0 auto;">
      <img style="margin-left:auto;margin-right:auto;display:block;" src="https://res.cloudinary.com/dhshtvtrl/image/upload/v1649219699/277029222_1050665038882369_8007002644319985784_n_oiilit.png" alt="logo">
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>    
    </div>`;
  
  await sendEmail({
    to: email,
    subject: 'Reset Password',
    text: message,
  });
}

async function resetPassword({ password }, resetToken) {
  const { error, value } = passwordSchema.validate({ password });

  if (error) {
    console.log(error);
    throw new AppError(400, 'Not a valid input');
  }

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken.replace(/\s+/g, ''))
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(404, 'Reset token not found');
  }

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  user.password = hash;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
}

async function sendMessage(email, name)
{
  const message = `
  <div style="max-width:1200px;margin: 0 auto;">
    <img style="margin-left:auto;margin-right:auto;display:block;" src="https://res.cloudinary.com/dhshtvtrl/image/upload/v1649219699/277029222_1050665038882369_8007002644319985784_n_oiilit.png" alt="logo">
    <h1>CHÚC MỪNG BẠN ĐÃ TRỞ THÀNH THÍ SINH CỦA WEBDEV ADVENTURE 2022</h1>
    <p>Xin chào , ${name}</p>
    <p>Ban tổ chức cuộc thi Webdev Adventure 2022 xin gửi lời cám ơn đến bạn đã đăng ký và hoàn thành lệ phí tham gia chương trình</p>
    <p>Bạn có thể đến sảnh C của trường Đại học Công Nghệ Thông Tin (khu phố 6 P, Thủ Đức, Thành phố Hồ Chí Minh) để nhận vé và các phần quà lưu niệm đặc biệt của chương trình nhé</p>
    <p>Liên hệ với chúng tôi qua: </p>
    <a href="https://www.facebook.com/webdevstudios.org" target="_blank">Fanpage </a>
    <br>
    <a href="https://adventure2022.webdevstudios.org/ranking" target="_blank">Website </a>
  </div>`;

  await sendEmail({
    to: email,
    subject: 'Welcome',
    text: message,
  });
  
}

module.exports = {
  login,
  signup,
  forgetPassword,
  resetPassword,
};
