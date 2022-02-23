const userColumns = [
  { header: 'Id', key: '_id', width: 30 },
  { header: 'Username', key: 'username', width: 30 },
  { header: 'Email', key: 'email', width: 40 },
  { header: 'Password', key: 'password', width: 30 },
  { header: 'Full name', key: 'fullname', width: 40 },
  { header: 'School', key: 'school', width: 40 },
  { header: 'Major', key: 'major', width: 30 },
  { header: 'Student Id', key: 'student_id', width: 30 },
  { header: 'Phone number', key: 'phone_number', width: 30 },
  { header: 'Facebook', key: 'facebook', width: 50 },
  { header: 'Short introduction', key: 'short_introduction', width: 50 },
  {
    header: 'Personal Registration',
    key: 'personal_registration',
    width: 20,
  },
  { header: 'User code', key: 'user_code', width: 20 },
  { header: 'Fee status', key: 'fee_status', width: 20 },
  { header: 'Team Id', key: 'team_id', width: 30 },
  { header: 'Team Name', key: 'team_name', width: 40 },
  { header: 'Note by admin', key: 'note_by_admin', width: 40 },
];

const teamColumns = [
  { header: 'Id', key: '_id', width: 30 },
  { header: 'Allow Add Number', key: 'allow_add_number', width: 20 },
  { header: 'Email to contact', key: 'email_to_contact', width: 40 },
  { header: 'Name', key: 'name', width: 40 },
  { header: 'Score', key: 'score', width: 20 },
  { header: 'Link Submission', key: 'link_submission', width: 40 },
  { header: 'Fee Status', key: 'fee_status', width: 20 },
  { header: 'Số thành viên', key: 'team_members', width: 20 },
];

const helpColumns = [
  { header: 'Id', key: '_id', width: 30 },
  { header: 'User Id', key: 'user_id', width: 30 },
  { header: 'Title', key: 'title', width: 30 },
  { header: 'Content', key: 'content', width: 50 },
  { header: 'Processing Status', key: 'processing_status', width: 20 },
  { header: 'Reply by admin', key: 'reply_by_admin', width: 50 },
  { header: 'Username', key: 'username', width: 30 },
  { header: 'Email', key: 'email', width: 40 },
  { header: 'Password', key: 'password', width: 30 },
  { header: 'Full name', key: 'fullname', width: 40 },
  { header: 'School', key: 'school', width: 40 },
  { header: 'Major', key: 'major', width: 30 },
  { header: 'Student Id', key: 'student_id', width: 30 },
  { header: 'Phone number', key: 'phone_number', width: 30 },
  { header: 'Facebook', key: 'facebook', width: 40 },
  { header: 'Short introduction', key: 'short_introduction', width: 50 },
  {
    header: 'Personal Registration',
    key: 'personal_registration',
    width: 30,
  },
  { header: 'User code', key: 'user_code', width: 30 },
  { header: 'Fee status', key: 'fee_status', width: 30 },
  { header: 'Team Id', key: 'team_id', width: 30 },
  { header: 'Team Name', key: 'team_name', width: 40 },
  { header: 'Note by admin', key: 'note_by_admin', width: 30 },
];

module.exports = {
  userColumns,
  teamColumns,
  helpColumns,
};