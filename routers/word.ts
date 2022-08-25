import express from 'express';

const router = express.Router();

import { getWord, getWordByPartOfSpeech } from '../controller/word';

router.get('/:word', getWord);
router.get('/:word/:partOfSpeech', getWordByPartOfSpeech);

export default router;
