/* eslint-disable */
import express, { Express } from 'express';
const app: Express = express();
const port = process.env.PORT || 4200;

import cors from 'cors';
require('express-async-errors');

import wordRouter from './routers/word';
import partOfSpeechRouter from './routers/part-of-speech';

import unknownEndpoint from './middlewares/unknownEndpoint';

// import { morganMiddleware } from './morgan';

app.use(express.json());
app.use(cors());
// app.use(morganMiddleware);

app.use('/part-of-speech', partOfSpeechRouter);
app.use('/', wordRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`listening in port ${port}`);
});
