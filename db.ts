import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});


const initDb = async () => {
  await pool.connect();

  console.log('Connecting to DB');
};

initDb();

export async function getWord(word: string) {
  const words = await pool.query(`SELECT * FROM words WHERE word ILIKE $1`, [word]);
  return words;
}

export async function getWordByPartOfSpeech(word: string, part_of_speech: string) {
  const words = await pool.query(`SELECT * FROM words WHERE word ILIKE $1 AND part_of_speech ILIKE $2`, [
    word,
    part_of_speech,
  ]);
  return words;
}

export async function getRandomWord(part_of_speech: string) {
  const words = await pool.query(`SELECT * FROM words WHERE part_of_speech ILIKE $1 ORDER BY RANDOM() LIMIT 1;`, [
    part_of_speech,
  ]);
  return words;
}

export async function getRandomWordWithFirstLetter(part_of_speech: string, letter: string) {
  const words = await pool.query(
    `SELECT * FROM words WHERE part_of_speech ILIKE $1 AND word ILIKE $2 ORDER BY RANDOM() LIMIT 1;`,
    [part_of_speech, `${letter}%`],
  );
  return words;
}
