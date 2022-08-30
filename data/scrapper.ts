import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const url = 'https://www.use-in-a-sentence.com/english-words/10000-words/the-most-frequent-10000-words-of-english.html';

const allWords = JSON.parse(fs.readFileSync('./dictionary.json', 'utf8'));

const convertPartOfSpeech = (pos: string): string => {
  let PartOfSpeech;
  switch (pos) {
    case 'n.': {
      PartOfSpeech = 'noun';
      break;
    }
    case 'prep.': {
      PartOfSpeech = 'preposition';
      break;
    }
    case 'a.': {
      PartOfSpeech = 'adjective';
      break;
    }
    case 'v.': {
      PartOfSpeech = 'verb';
      break;
    }
    case 'adv.': {
      PartOfSpeech = 'adverb';
      break;
    }
    case 'p.': {
      PartOfSpeech = 'pronoun';
      break;
    }
    case 'interj.': {
      PartOfSpeech = 'interjection';
      break;
    }
    case 'conj.': {
      PartOfSpeech = 'conjunction';
      break;
    }
    case 'pron.': {
      PartOfSpeech = 'pronoun';
      break;
    }
  }
  return PartOfSpeech as string;
};

export const getMostPopularWords = async () => {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const liElementArray = $('#templatemo_content > div:nth-child(1) > ul > li > a');

  const wordsArray: any[] = [];

  liElementArray.each(function () {
    const word = $(this).text();

    wordsArray.push(word);
  });

  const arrayOfMostPopularWord = [];

  for (let word of allWords) {
    if (wordsArray.includes(word.word.toLowerCase())) {
      const wordInDBFormat = {
        word: word.word.toLowerCase(),
        part_of_speech: convertPartOfSpeech(word.pos),
        definitions: word.definitions.join('\n').replace(/'/g, '`'),
      };

      arrayOfMostPopularWord.push(wordInDBFormat);
    }
  }

  return arrayOfMostPopularWord;
};
