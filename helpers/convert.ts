/* eslint-disable */

import { Item } from '../types';

export const convertToResFormat = (array: Item[]) => {
  const resFormat = [];
  for (const item of array) {
    const resItem = { Word: '', Part_of_speech: '', Definition: [] };
    resItem.Word = item.Word.S;
    resItem.Part_of_speech = item.Part_of_speech.S;
    for (const def of item.Definition.L) {
      // @ts-ignore: Unreachable code error
      resItem.Definition.push(def.S);
    }
    resFormat.push(resItem);
  }
  return resFormat;
};

export const convertPartOfSpeechToTableFormat = (
  partOfSpeech: string
): string => {
  return partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1);
};
