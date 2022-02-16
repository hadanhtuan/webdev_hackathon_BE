const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const api = require('./src/api');
const swaggerDoc = require('./swagger.json');
const createAdminUser = require('./src/common/utils/createAdminUser');
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
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
