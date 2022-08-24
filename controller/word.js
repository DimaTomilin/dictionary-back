const { dynamoDB } = require('../db');
const {
  convertToResFormat,
  convertPartOfSpeechToTableFormat,
} = require('../helpers/convert');

const getWord = async (req, res) => {
  const word = req.params.word.toLowerCase();

  const params = {
    ExpressionAttributeValues: {
      ':v1': {
        S: word,
      },
    },
    KeyConditionExpression: 'Word=:v1',
    TableName: 'Words_Main_DB',
  };

  dynamoDB.query(params, (err, data) => {
    if (err) {
      res.send({ error: err });
    } else if (data.Items.length === 0) {
      res.status(404).send({ error: 'No such word in database' });
    } else res.send(convertToResFormat(data.Items));
  });
};

const getWordByPartOfSpeech = async (req, res) => {
  const { partOfSpeech, word } = req.params;
  const partOfSpeechTableFormat =
    convertPartOfSpeechToTableFormat(partOfSpeech);

  const params = {
    ExpressionAttributeValues: {
      ':v1': {
        S: word.toLowerCase(),
      },
      ':v2': {
        S: partOfSpeechTableFormat,
      },
    },
    KeyConditionExpression: 'Word=:v1 and Part_of_speech=:v2',
    TableName: 'Words_Main_DB',
  };
  dynamoDB.query(params, (err, data) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send(convertToResFormat(data.Items));
    }
  });
};

module.exports = { getWord, getWordByPartOfSpeech };
