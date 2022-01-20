const AWS = require('aws-sdk');
const fs = require('fs');
const { nanoid } = require('nanoid');
const config = require('./config');

const convertPartOfSpeech = (pos) => {
  let PartOfSpeech;
  switch (pos) {
    case 'n.': {
      PartOfSpeech = 'Noun';
      break;
    }
    case 'prep.': {
      PartOfSpeech = 'Preposition';
      break;
    }
    case 'a.': {
      PartOfSpeech = 'Adjective';
      break;
    }
    case 'v.': {
      PartOfSpeech = 'Verb';
      break;
    }
    case 'adv.': {
      PartOfSpeech = 'Adverb';
      break;
    }
    case 'p.': {
      PartOfSpeech = 'Pronoun';
      break;
    }
    case 'interj.': {
      PartOfSpeech = 'Interjection';
      break;
    }
    case 'conj.': {
      PartOfSpeech = 'Conjunction';
      break;
    }
    case 'pron.': {
      PartOfSpeech = 'Pronoun';
      break;
    }
    default: {
      break;
    }
  }
  return PartOfSpeech;
};

const getMovies = () => {
  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'Words_Test',
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const { Items } = data;
      console.log(data);
    }
  });
};

const addMovie = () => {
  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();
  const Item = {
    Definition: '21wewe',
    PartOfSpeech: 'Noun',
    ID: 2,
    Word: 'Dima2',
  };
  const params = {
    TableName: config.aws_table_name,
    Item,
  };

  // Call DynamoDB to add the item to the table
  docClient.put(params, (err, data) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('Added movie', data);
    }
  });
};

const createTable = () => {
  AWS.config.update(config.aws_remote_config);

  const dynamodb = new AWS.DynamoDB();

  const params = {
    TableName: 'Words_Test',
    KeySchema: [
      { AttributeName: 'Id', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'Word', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'Id', AttributeType: 'S' },
      { AttributeName: 'Word', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  // Call DynamoDB to add the item to the table
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    }
  });
};

const addWordToTable = () => {
  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();

  console.log('Importing words into DynamoDB. Please wait.');

  const allWords = JSON.parse(fs.readFileSync('./dictionary.json', 'utf8'));
  allWords.slice(0, 21).forEach(({ word, pos, definitions }) => {
    const params = {
      TableName: 'Words_Test',
      Item: {
        Id: nanoid(),
        Word: word.toLowerCase(),
        Part_of_speech: convertPartOfSpeech(pos),
        Definition: definitions,
      },
    };

    docClient.put(params, (err, data) => {
      if (err) {
        console.error(
          'Unable to add movie',
          word,
          '. Error JSON:',
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log('PutItem succeeded:', word);
      }
    });
  });
};

addWordToTable();
