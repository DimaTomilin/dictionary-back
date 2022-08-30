import { getMostPopularWords } from './scrapper.js';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function initDb() {
  await client.connect();

  await client.query('DROP TABLE IF EXISTS words');

  await client.query(`CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    part_of_speech VARCHAR(255) NOT NULL,
    definitions TEXT NOT NULL
  );`);

  const wordsArray = await getMostPopularWords();
  for (let i = 0; i < wordsArray.length; i = i + 10) {
    await client.query(
      `INSERT INTO words (word, part_of_speech, definitions) VALUES ('${wordsArray[i + 0].word}','${
        wordsArray[i + 0].part_of_speech
      }','${wordsArray[i + 0].definitions}'),('${wordsArray[i + 1].word}','${wordsArray[i + 1].part_of_speech}','${
        wordsArray[i + 1].definitions
      }'),('${wordsArray[i + 2].word}','${wordsArray[i + 2].part_of_speech}','${wordsArray[i + 2].definitions}'),('${
        wordsArray[i + 3].word
      }','${wordsArray[i + 3].part_of_speech}','${wordsArray[i + 3].definitions}'),('${wordsArray[i + 4].word}','${
        wordsArray[i + 4].part_of_speech
      }','${wordsArray[i + 4].definitions}'),('${wordsArray[i + 5].word}','${wordsArray[i + 5].part_of_speech}','${
        wordsArray[i + 5].definitions
      }'),('${wordsArray[i + 6].word}','${wordsArray[i + 6].part_of_speech}','${wordsArray[i + 6].definitions}'),('${
        wordsArray[i + 7].word
      }','${wordsArray[i + 7].part_of_speech}','${wordsArray[i + 7].definitions}'),('${wordsArray[i + 8].word}','${
        wordsArray[i + 8].part_of_speech
      }','${wordsArray[i + 8].definitions}'),('${wordsArray[i + 9].word}','${wordsArray[i + 9].part_of_speech}','${
        wordsArray[i + 9].definitions
      }');`,
    );
  }
  // for (let word of wordsArray) {
  //   await client.query(
  //     `INSERT INTO words (word, part_of_speech, definitions) VALUES ('${word.word}','${word.part_of_speech}','${word.definitions}');`,
  //   );
  // }
}

initDb();
