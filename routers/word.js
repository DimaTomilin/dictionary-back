const express = require('express');

const router = express.Router();

const { getWord, getWordByPartOfSpeech } = require('../controller/word');

router.get('/:word', getWord);
router.get('/:word/:partOfSpeech', getWordByPartOfSpeech);

module.exports = router;
