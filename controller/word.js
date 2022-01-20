const AWS = require('aws-sdk');
const config = require('../data/config');
const { convertToResFormat } = require('../helpers/convert');

const getWord = async (req, res) => {
  const word = req.params.word.toLowerCase();
  AWS.config.update(config.aws_remote_config);

  const dynamodb = new AWS.DynamoDB();

  const params = {
    ExpressionAttributeValues: {
      ':v1': {
        S: word,
      },
    },
    KeyConditionExpression: 'Word=:v1',
    TableName: 'Words_Main_DB',
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send(convertToResFormat(data.Items));
    }
  });
};

const getWordByPartOfSpeech = async (req, res) => {
  const { partOfSpeech, word } = req.params;
  AWS.config.update(config.aws_remote_config);

  const dynamodb = new AWS.DynamoDB();

  const params = {
    ExpressionAttributeValues: {
      ':v1': {
        S: word.toLowerCase(),
      },
      ':v2': {
        S: partOfSpeech,
      },
    },
    KeyConditionExpression: 'Word=:v1 and Part_of_speech=:v2',
    TableName: 'Words_Main_DB',
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send(convertToResFormat(data.Items));
    }
  });
};

module.exports = { getWord, getWordByPartOfSpeech };
