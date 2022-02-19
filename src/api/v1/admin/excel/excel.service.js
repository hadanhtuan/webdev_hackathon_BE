const exceljs = require('exceljs');
const User = require('../../../../models/user');
const Team = require('../../../../models/team');
const {
  createSheet,
  writeExcelToDisk,
} = require('../../../../common/excel/index');

const userColumns = [
  { header: 'Username', key: 'username', width: 30 },
  { header: 'Name', key: 'email', width: 30 },
  { header: 'Full name', key: 'fullname', width: 30 },
  { header: 'School', key: 'school', width: 30 },
  { header: 'Major', key: 'major', width: 30 },
  { header: 'Student Id', key: 'student_id', width: 30 },
  { header: 'Phone number', key: 'phone_number', width: 30 },
  { header: 'Facebook', key: 'facebook', width: 30 },
  { header: 'Short introduction', key: 'short_introduction', width: 30 },
  {
    header: 'Personal Registration',
    key: 'personal_registration',
    width: 30,
  },
  { header: 'User code', key: 'user_code', width: 30 },
  { header: 'Fee status', key: 'fee_status', width: 30 },
  { header: 'Team Id', key: 'team_id', width: 30 },
  { header: 'Note by admin', key: 'note_by_admin', width: 30 },
];

const teamColumns = [
  { header: 'Email to contact', key: 'email_to_contact', width: 30 },
  { header: 'Name', key: 'name', width: 30 },
  { header: 'Score', key: 'score', width: 30 },
  { header: 'Link Submission', key: 'link_submission', width: 30 },
  { header: 'Fee Status', key: 'fee_status', width: 30 },
];

const getExcelFile = async () => {
  const workbook = new exceljs.Workbook();
  const users = await User.find({ role: 'user' });
  const teams = await Team.find({});
  await createSheet(users, userColumns, 'Users', workbook, 'A1:O1');
  await createSheet(teams, teamColumns, 'Team', workbook, 'A1:E1');
  const fileName = await writeExcelToDisk(workbook);
  return fileName;
};

module.exports = {
  getExcelFile,
};
