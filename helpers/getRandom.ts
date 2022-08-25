import { Item } from '../types';

export const getRandomItem = (array: Item[], count: number) => {
  const randomIndex = Math.floor(Math.random() * count);
  return [array[randomIndex]];
};

export const getRandomItemByLetter = (array: Item[] | any, letter: string) => {
  const filtredArray = array.filter(
    (word: { Word: string }) => word.Word[0] === letter
  );
  const randomIndex = Math.floor(Math.random() * filtredArray.length);
  return [filtredArray[randomIndex]];
};
