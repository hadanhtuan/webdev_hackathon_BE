const bcrypt = require('bcrypt');
const User = require('../../models/user');
require('dotenv').config();

const createAdminUser = async () => {
  if (process.env.CREATE_ADMIN !== 'true') return null;
  await User.findOneAndDelete({ username: process.env.ADMINUSERNAME });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.ADMINPASSWORD, salt);
  const admin = new User({
    username: process.env.ADMINUSERNAME,
    email: 'test@test.com',
    password: hashedPassword,
    role: 'admin',
    fullname: 'test',
    school: 'test',
    major: 'test',
    student_id: 'test',
    phone_number: 'test',
    facebook: 'test',
    short_introduction: 'test',
    personal_registration: true,
    user_code: 'test',
    fee_status: true,
    team_id: null,
    note_by_admin: null,
  });

  return admin.save();
};

module.exports = createAdminUser;
