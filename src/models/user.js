const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  fullname: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    default: null,
  },
  student_id: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  short_introduction: {
    type: String,
    default: null,
  },
  personal_registration: {
    type: Boolean,
    required: true,
    default: true,
  },
  user_code: {
    type: String,
    required: true,
  },
  fee_status: {
    type: Boolean,
    required: true,
    default: false,
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  note_by_admin: {
    type: String,
    default: null,
  },
  gpa: {
    type: Number,
    default: null
  },
  graduation_year: {
    type: Number,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: String,
  },
});

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // tạo resetToken và hash nó rồi lưu vào database
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Mốc mà token hết hạn
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 phút

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
