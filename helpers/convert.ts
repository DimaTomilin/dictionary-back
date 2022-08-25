/* eslint-disable */

import { Item } from '../types';

/**
 * convertToResFormat
 *
 * Fucntion get Array of words from DB and need to convert it to correct format that my user will get on clientside
 * @param array Array of words from DynamoDB
 * @returns A array of words in correct format
 */
export const convertToResFormat = (array: Item[]) => {
  const resFormatArray = [];
  for (const item of array) {
    const resFormatItem = { Word: '', Part_of_speech: '', Definition: [] };
    resFormatItem.Word = item.Word.S;
    resFormatItem.Part_of_speech = item.Part_of_speech.S;
    for (const def of item.Definition.L) {
      // @ts-ignore: Unreachable code error
      resFormatItem.Definition.push(def.S);
    }
    resFormatArray.push(resFormatItem);
  }
  return resFormatArray;
};

/**
 * convertPartOfSpeechToTableFormat
 *
 * @param partOfSpeech string of part of speech
 * @returns string in table format with first letter upper case
 */
export const convertPartOfSpeechToTableFormat = (
  partOfSpeech: string
): string => {
  return partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1);
};
