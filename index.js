const express = require('express');

const app = express();

const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routers/user');
const { morganBodyLogger } = require('./morgan');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors);
app.use(morganBodyLogger);

app.get('/', (req, res) => {
  res.send('working');
});
app.use('/user', userRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`litsening in port ${port}`);
});
