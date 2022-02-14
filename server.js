const express = require('express');
const cors = require('cors');
require('dotenv').config();

const api = require('./src/api');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use('/api');

app.get('/', (req, res) => {
  res.status(200).json({
    message: `Server run OK on port ${port}`,
  });
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(port);
