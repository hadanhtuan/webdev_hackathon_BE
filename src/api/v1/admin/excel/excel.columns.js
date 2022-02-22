const userColumns = [
  { header: 'Id', key: '_id', width: 30 },
  { header: 'Username', key: 'username', width: 30 },
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Password', key: 'password', width: 30 },
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
  { header: 'Team Name', key: 'team_name', width: 30 },
  { header: 'Note by admin', key: 'note_by_admin', width: 30 },
];

const teamColumns = [
  { header: 'Id', key: '_id', width: 30 },
  { header: 'Allow Add Number', key: 'allow_add_number', width: 30 },
  { header: 'Email to contact', key: 'email_to_contact', width: 30 },
  { header: 'Name', key: 'name', width: 30 },
  { header: 'Score', key: 'score', width: 30 },
  { header: 'Link Submission', key: 'link_submission', width: 30 },
  { header: 'Fee Status', key: 'fee_status', width: 30 },
  { header: 'Số thành viên', key: 'team_members', width: 30 },
];

const helpColumns = [
  { header: 'Id', key: '_id', width: 30 },
  { header: 'User Id', key: 'user_id', width: 30 },
  { header: 'Title', key: 'title', width: 30 },
  { header: 'Content', key: 'content', width: 30 },
  { header: 'Processing Status', key: 'processing_status', width: 30 },
  { header: 'Reply by admin', key: 'reply_by_admin', width: 30 },
  { header: 'Username', key: 'username', width: 30 },
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Password', key: 'password', width: 30 },
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
  { header: 'Team Name', key: 'team_name', width: 30 },
  { header: 'Note by admin', key: 'note_by_admin', width: 30 },
];

module.exports = {
  userColumns,
  teamColumns,
  helpColumns,
};
