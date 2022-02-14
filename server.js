const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const api = require('./src/api');
const swaggerDoc = require('./swagger.json');

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
        url: `http://localhost:${port}`,
        description: 'Localhost server',
      },
    ],
  })
);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
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
  .then(() => {
    return createAdminUser();
  })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
const User = require('./src/models/user');
const bcrypt = require('bcrypt');

const createAdminUser = async () => {
  if (!process.env.DEVELOPMENT) return;
  await User.findOneAndDelete({ username: process.env.ADMINUSERNAME });
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(process.env.ADMINPASSWORD, salt);
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
