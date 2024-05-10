import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { DATABASES, MY_DB_COLLECTIONS, SAMPLE_COLLECTIONS } from '../constants';
import { MovieType, ProductType } from '../types';

config();
const mongoUri = process.env.DB_URI as string;

const client = new MongoClient(mongoUri);
const myDb = client.db(DATABASES.MY_DB);
const sampleDb = client.db(DATABASES.SAMPLE_DB);

export const myDbProductsCollection = myDb.collection<ProductType>(
  MY_DB_COLLECTIONS.PRODUCTS
);
export const moviesCollection = sampleDb.collection<MovieType>(
  SAMPLE_COLLECTIONS.MOVIES
);

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
