import { Request, Response } from 'express';
import { dynamoDB } from '../db';
import { getRandomItem, getRandomItemByLetter } from '../helpers/getRandom';
import {
  convertPartOfSpeechToTableFormat,
  convertToResFormat,
} from '../helpers/convert';

export const getRandomWordOfPart = async (req: Request, res: Response) => {
  const partOfSpeech = convertPartOfSpeechToTableFormat(req.params.part);
  const { letter } = req.query as { letter: string };

  const params = {
    FilterExpression: 'Part_of_speech = :p',
    ExpressionAttributeValues: {
      ':p': { S: partOfSpeech },
    },
    TableName: 'Words_Main_DB',
  };

  dynamoDB.scan(params, (_err, data: any | undefined) => {
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
