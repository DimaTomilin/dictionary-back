/* eslint-disable */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
require('express-async-errors');

const wordRouter = require('./routers/word');
const partOfSpeechRouter = require('./routers/part-of-speech');

const unknownEndpoint = require('./middlewares/unknownEndpoint');

const { morganBodyLogger } = require('./morgan');

app.use(express.json());
app.use(cors());
app.use(morganBodyLogger);

app.use('/part-of-speech', partOfSpeechRouter);
app.use('/', wordRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`listening in port ${port}`);
});
