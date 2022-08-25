import express from 'express';

const router = express.Router();

import { getRandomWordOfPart } from '../controller/part-of-speech';

router.get('/:part', getRandomWordOfPart);

export default router;
