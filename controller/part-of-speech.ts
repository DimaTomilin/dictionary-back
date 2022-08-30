import { Request, Response } from 'express';
import { getRandomWord, getRandomWordWithFirstLetter } from '../db';

export const getRandomWordOfPart = async (req: Request, res: Response) => {
  const partOfSpeech = req.params.part.toLocaleLowerCase();
  const { letter } = req.query as { letter: string };

  let word;
  if (letter) {
    word = await getRandomWordWithFirstLetter(partOfSpeech, letter[0]);
  } else {
    word = await getRandomWord(partOfSpeech);
  }

  res.send(word.rows);
};
