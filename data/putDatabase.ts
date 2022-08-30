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
  for (let word of wordsArray) {
    await client.query(
      `INSERT INTO words (word, part_of_speech, definitions) VALUES ('${word.word}','${word.part_of_speech}','${word.definitions}');`,
    );
  }
}

initDb();
