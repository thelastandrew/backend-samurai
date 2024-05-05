import { config } from 'dotenv';
import { app } from './app';
import { connectToDb } from './db';

config();
const port = process.env.PORT || 3000;

const start = async () => {
  await connectToDb();
  app.listen(port, () => {
    console.log(`Server is up and running on on port ${port}`);
  })
};

start();
