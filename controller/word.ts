import { QueryOutput } from 'aws-sdk/clients/dynamodb';
import { Request, Response } from 'express';
import { dynamoDB } from '../db';
import {
  convertToResFormat,
  convertPartOfSpeechToTableFormat,
} from '../helpers/convert';

export const getWord = async (req: Request, res: Response) => {
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

  dynamoDB.query(params, (_err, data: any | undefined) => {
    if (data.Items.length === 0) {
      res.status(404).send({ error: 'No such word in database' });
    } else res.send(convertToResFormat(data.Items));
  });
};

export const getWordByPartOfSpeech = async (req: Request, res: Response) => {
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
  dynamoDB.query(params, (_err, data: any | undefined) => {
    if (data) {
      res.send(convertToResFormat(data.Items));
    }
  });
};
