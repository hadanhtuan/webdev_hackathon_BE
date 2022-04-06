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
    email: 'admin@admin.com',
    password: hashedPassword,
    role: 'admin',
    fullname: 'admin',
    school: 'admin',
    major: 'admin',
    student_id: 'admin',
    phone_number: 'admin',
    facebook: 'admin',
    short_introduction: 'admin',
    personal_registration: true,
    user_code: 'admin',
    fee_status: true,
    team_id: null,
    note_by_admin: null,
  });

  const masterAdminHashedPassword = await bcrypt.hash(
    process.env.MASTERADMINPASSWORD,
    salt
  );
  const masterAdmin = new User({
    username: process.env.MASTERADMINUSERNAME,
    email: 'masteradmin@admin.com',
    password: masterAdminHashedPassword,
    role: 'master_admin',
    fullname: 'master admin',
    school: 'master admin',
    major: 'master admin',
    student_id: 'master admin',
    phone_number: 'master admin',
    facebook: 'master admin',
    short_introduction: 'master admin',
    personal_registration: true,
    user_code: 'master admin',
    fee_status: true,
    team_id: null,
    note_by_admin: null,
  });

  return Promise.all([admin.save(), masterAdmin.save()]);
};

module.exports = createAdminUser;
