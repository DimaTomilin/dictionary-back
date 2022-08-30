import express from 'express';

const router = express.Router();

import { getWordFunc, getWordByPartOfSpeechFunc } from '../controller/word';

router.get('/:word', getWordFunc);
router.get('/:word/:partOfSpeech', getWordByPartOfSpeechFunc);

export default router;
