/* eslint-disable */
const AWS = require('aws-sdk');
const fs = require('fs');
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

const addWordToTable = (start, end) => {
  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();

  console.log('Importing words into DynamoDB. Please wait.');

  const allWords = JSON.parse(
    fs.readFileSync('./data/dictionary.json', 'utf8')
  );
  allWords.slice(start, end).forEach(({ word, pos, definitions }) => {
    const params = {
      TableName: 'Words_Main_DB',
      Item: {
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

let a = 0;
let b = 3000;
addWordToTable(a, b);
a += 3000;
b += 3000;
console.log('NEW CHUNK');
setInterval(() => {
  addWordToTable(a, b);
  a += 3000;
  b += 3000;
  console.log('NEW CHUNK');
}, 60000);
