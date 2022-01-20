const express = require('express');

const router = express.Router();

const { getRandomWordOfPart } = require('../controller/part-of-speech');

router.get('/:part', getRandomWordOfPart);

module.exports = router;
