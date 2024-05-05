import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();
const mongoUri = process.env.DB_URI as string;

export const client = new MongoClient(mongoUri);

export const connectToDb = async () => {
  try {
    await client.connect();
    await client.db('test').command({ ping: 1 });
    console.log('Successfully connected to mongo server');
  } catch (error) {
    console.log('Cannot connect to mongo server');
    await client.close();
  }
};