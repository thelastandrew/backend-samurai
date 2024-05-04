import { config } from 'dotenv';
import { app } from './app';
import { connectToCluster } from './db';

config();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  const uri = process.env.DB_URI as string;
  let mongoClient;

  try {
    console.log(`Example app listening on port ${port}`);
    mongoClient = await connectToCluster(uri);
  } finally {
    await mongoClient?.close();
  }
});
