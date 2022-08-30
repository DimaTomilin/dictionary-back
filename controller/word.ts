import { Request, Response } from 'express';
import { getWord, getWordByPartOfSpeech } from '../db';

export const getWordFunc = async (req: Request, res: Response) => {
  const word = req.params.word.toLowerCase();

  const resultWords = await getWord(word);

  if (resultWords.rows.length === 0) {
    res.status(404).send({ error: 'No such word in database' });
  } else res.send(resultWords.rows);
};

export const getWordByPartOfSpeechFunc = async (req: Request, res: Response) => {
  const { partOfSpeech, word } = req.params;

  const resultWords = await getWordByPartOfSpeech(word.toLocaleLowerCase(), partOfSpeech.toLocaleLowerCase());

  if (resultWords.rows.length === 0) {
    res.status(404).send({ error: 'No such word in database' });
  } else res.send(resultWords.rows);
};
