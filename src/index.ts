import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

const products = [
  { id: 1, title: 'tomato' },
  { id: 1, title: 'orange' },
];
const addresses = [
  { id: 1, value: 'Moscow' },
  { id: 2, value: 'Perm' },
];

app.get('/products', (req: Request, res: Response) => {
  const { title } = req.query;
  console.log('title', title);
  if (!title) {
    res.send(products);
    return;
  }

  res.send(products.filter((p) => p.title.indexOf(title as string) > -1));
});

app.get('/products/:title', (req: Request, res: Response) => {
  const product = products.find((p) => p.title === req.params.title);

  if (!product) {
    res.sendStatus(404);
    return;
  }

  res.send(product);
});

app.get('/addresses', (_: Request, res: Response) => {
  res.send(addresses);
});

app.get('/addresses/:id', (req: Request, res: Response) => {
  const address = addresses.find((a) => a.id === Number(req.params.id));

  if (!address) {
    res.sendStatus(404);
    return;
  }

  res.send(address);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
