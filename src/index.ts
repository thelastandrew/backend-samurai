import { app } from './app';
import { connectToDb } from './db';
import { settings } from './settings';

const port = settings.PORT;

const start = async () => {
  await connectToDb();
  app.listen(port, () => {
    console.log(`Server is up and running on on port ${port}`);
  });
};

start();
