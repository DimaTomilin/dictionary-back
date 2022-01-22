/* eslint-disable */
const serverless = require('serverless-http');
const express = require('express');
const app = express();

const cors = require('cors');
require('express-async-errors');
require('dotenv').config();

const wordRouter = require('./routers/word');
const partOfSpeechRouter = require('./routers/part-of-speech');
// const { morganBodyLogger } = require('./morgan');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use(morganBodyLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/part-of-speech', partOfSpeechRouter);
app.use('/', wordRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

// error handling middleware
app.use(errorHandlingMiddleware);

module.exports.handler = serverless(app);

// app.listen(port, () => {
//   console.log(`litsening in port ${port}`);
// });
