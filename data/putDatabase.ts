/* eslint-disable */
import fs from 'fs';
import { dynamoDB } from '../db';

interface ItemParams {
  word: string;
  pos: string;
  definitions: string[];
}

const convertPartOfSpeech = (pos: string): string => {
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
  }
  return PartOfSpeech as string;
};

const createTable = () => {
  const params = {
    TableName: 'Words_Main_DB',
    KeySchema: [
      { AttributeName: 'Word', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'Part_of_speech', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'Word', AttributeType: 'S' },
      { AttributeName: 'Part_of_speech', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 20,
      WriteCapacityUnits: 20,
    },
  };

  // Call DynamoDB to create table
  dynamoDB.createTable(params, (err: any, data: any) => {
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

const deleteTable = () => {
  const params = {
    TableName: 'Words_Main_DB',
  };

  // Call DynamoDB to delete table
  dynamoDB.deleteTable(params, (err: any, data: any) => {
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

const addWordToTable = (start: number, end: number) => {
  console.log('Importing words into DynamoDB. Please wait.');

  const allWords = JSON.parse(
    fs.readFileSync('./data/dictionary.json', 'utf8')
  );
  allWords
    .slice(start, end)
    .forEach(({ word, pos, definitions }: ItemParams) => {
      const params = {
        TableName: 'Words_Main_DB',
        Item: {
          Word: word.toLowerCase(),
          Part_of_speech: convertPartOfSpeech(pos),
          Definition: definitions,
        },
      };

      // @ts-ignore: Unreachable code error
      dynamoDB.putItem(params, (err: any, data: any) => {
        if (err) {
          console.error(
            'Unable to add',
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

/**
 * creatingNewDB
 *
 * Function that user can use to create database to his own DynamoDB accout.
 * It deletes, creates table and than sending all data in small chuncks that AWS will get it.
 */
const creatingNewDB = () => {
  deleteTable();
  createTable();

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
};

creatingNewDB();
