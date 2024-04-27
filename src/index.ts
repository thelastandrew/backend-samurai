import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello Andrey!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
