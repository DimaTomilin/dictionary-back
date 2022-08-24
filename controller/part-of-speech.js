const { dynamoDB } = require('../db');
const {
  getRandomItem,
  getRandomItemByLetter,
} = require('../helpers/getRandom');
const {
  convertPartOfSpeechToTableFormat,
  convertToResFormat,
} = require('../helpers/convert');

const getRandomWordOfPart = async (req, res) => {
  const partOfSpeech = convertPartOfSpeechToTableFormat(req.params.part);
  const { letter } = req.query;

  const params = {
    FilterExpression: 'Part_of_speech = :p',
    ExpressionAttributeValues: {
      ':p': { S: partOfSpeech },
    },
    TableName: 'Words_Main_DB',
  };

  dynamoDB.scan(params, (err, data) => {
    if (letter) {
      const word = convertToResFormat(
        getRandomItemByLetter(data.Items, letter)
      );
      res.send(word);
    } else {
      const word = convertToResFormat(getRandomItem(data.Items, data.Count));
      res.send(word);
    }
  });
};

module.exports = { getRandomWordOfPart };
