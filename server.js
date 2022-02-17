const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const api = require('./src/api');
const swaggerDoc = require('./swagger.json');
const createAdminUser = require('./src/common/utils/createAdminUser');
const createAllowLinkSubmission = require('./src/common/utils/createAllowLinkSubmission');
const exceljs = require('exceljs');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', api);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup({
    ...swaggerDoc,
    servers: [
      {
        url: `${process.env.SERVER_ADDRESS}:${port}`,
        description: 'server',
      },
    ],
  })
);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.get('/excel', async (req, res) => {
  const workbook = new exceljs.Workbook();
  const sheet = workbook.addWorksheet('My Sheet');
  const users = await require('./src/models/user').find({});
  sheet.autoFilter = {
    from: 'A1',
    to: 'O1',
  };
  sheet.columns = [
    { header: 'Username', key: 'username', width: 20 },
    { header: 'Name', key: 'email', width: 20 },
    { header: 'Full name', key: 'fullname', width: 20 },
    { header: 'School', key: 'school', width: 20 },
    { header: 'Major', key: 'major', width: 20 },
    { header: 'Student Id', key: 'student_id', width: 20 },
    { header: 'Phone number', key: 'phone_number', width: 20 },
    { header: 'Facebook', key: 'facebook', width: 20 },
    { header: 'Short introduction', key: 'short_introduction', width: 20 },
    {
      header: 'Personal Registration',
      key: 'personal_registration',
      width: 20,
    },
    { header: 'User code', key: 'user_code', width: 20 },
    { header: 'Fee status', key: 'fee_status', width: 20 },
    { header: 'Team Id', key: 'team_id', width: 20 },
    { header: 'Note by admin', key: 'note_by_admin', width: 20 },
  ];

  sheet.columns.forEach((column, index) => {
    column.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    column.font = {
      name: 'Arial',
      size: 12,
    };
  });
  sheet.getRow('1').eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ffec99' },
    };
  });
  sheet.addRows(users);
  for (let i = 2; i <= sheet.rowCount; i += 1) {
    if (i % 2 === 0) {
      sheet.getRow(i.toString()).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '99e9f2' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    } else {
      sheet.getRow(i.toString()).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'd8f5a2' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    }
  }
  const fileName = `${__dirname}/exportExcel/${require('crypto')
    .randomBytes(16)
    .toString('hex')}.xlsx`;
  await workbook.xlsx.writeFile(fileName);
  res.sendFile(fileName, (err) => {
    if (err) {
      console.log(err);
    } else {
      fs.unlink(fileName, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
});

app.use((req, res, next) => {
  res.status(404).json('Endpoint not found');
});

app.use((err, req, res, next) => {
  let { statusCode } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  res.status(statusCode).json({
    message: err.message,
  });
});

mongoose
  .connect(process.env.MONGOURI)
  .then(() => createAdminUser())
  .then(() => createAllowLinkSubmission(false))
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
