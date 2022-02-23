const exceljs = require('exceljs');
const User = require('../../../../models/user');
const Team = require('../../../../models/team');
const Help = require('../../../../models/help');
const {
  createSheet,
  writeExcelToDisk,
} = require('../../../../common/excel/index');

const { userColumns, teamColumns, helpColumns } = require('./excel.columns');

const getExcelFile = async () => {
  const workbook = new exceljs.Workbook();
  const users = await User.find({ role: 'user' });
  const exportUsers = await Promise.all(
    users.map(async (user) => {
      let team_name = '';
      let team_id = '';
      if (user.team_id) {
        const team = await Team.findById(user.team_id);
        team_name = team.name;
        team_id = user.team_id.toString();
      }
      const _id = user._id.toString();
      const exportUser = { ...user._doc, team_name, _id, team_id };
      return exportUser;
    })
  );
  const teams = await Team.find({});
  const exportTeams = await Promise.all(
    teams.map(async (team) => {
      const _id = team._id.toString();
      const team_members = await User.find({
        team_id: team._id.toString(),
      }).count();
      return { ...team._doc, team_members };
    })
  );
  const helps = await Help.find({});
  const exportHelps = await Promise.all(
    helps.map(async (help) => {
      const user = await User.findById(help.user_id);
      const _id = help._id.toString();
      const user_id = help.user_id.toString();
      let team_name = '';
      let team_id = '';
      if (user.team_id) {
        const team = await Team.findById(user.team_id);
        team_name = team.name;
        team_id = user.team_id.toString();
      }
      return { ...help._doc, ...user._doc, team_name, team_id, user_id, _id };
    })
  );
  await createSheet(
    exportUsers,
    userColumns,
    'Danh sách thí sinh',
    workbook,
    'A1:S1'
  );
  await createSheet(
    exportTeams,
    teamColumns,
    'Danh sách đội',
    workbook,
    'A1:H1'
  );
  await createSheet(
    exportHelps,
    helpColumns,
    'Danh sách yêu cầu hỗ trợ',
    workbook,
    'A1:V1'
  );
  const fileName = await writeExcelToDisk(workbook);
  return fileName;
};

module.exports = {
  getExcelFile,
};
