const AWS = require('aws-sdk');
const config = require('../data/config');
const {
  getRandomItem,
  getRandomItemByLetter,
} = require('../helpers/getRandom');
const { convertPartOfSpeechToTableFormat } = require('../helpers/convert');

const getRandomWordOfPart = async (req, res) => {
  const partOfSpeech = convertPartOfSpeechToTableFormat(req.params.part);
  const { letter } = req.query;

  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    FilterExpression: 'Part_of_speech = :p',
    ExpressionAttributeValues: {
      ':p': partOfSpeech,
    },
    TableName: 'Words_Main_DB',
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      res.send({ error: err });
    } else if (letter) {
      res.send(getRandomItemByLetter(data.Items, letter));
    } else {
      res.send(getRandomItem(data.Items, data.Count));
    }
  });
};

module.exports = { getRandomWordOfPart };
