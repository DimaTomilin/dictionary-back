const express = require('express');

const app = express();

const cors = require('cors');
require('express-async-errors');
require('dotenv').config();

const wordRouter = require('./routers/word');
const { morganBodyLogger } = require('./morgan');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morganBodyLogger);

app.get('/', (req, res) => {
  console.log('here');
  res.send('working');
});
app.use('/', wordRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`litsening in port ${port}`);
});
