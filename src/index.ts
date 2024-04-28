import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

let products = [
  { id: 1, title: 'tomato' },
  { id: 2, title: 'orange' },
];

const bodyParserJsonMiddleware = bodyParser.json();

app.use(bodyParserJsonMiddleware);

app.get('/products', (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title) {
    res.send(products);
    return;
  }

  res.send(products.filter((p) => p.title.indexOf(title as string) > -1));
});

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.sendStatus(404);
    return;
  }

  res.send(product);
});

app.delete('/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.sendStatus(404);
    return;
  }

  products = products.filter((p) => p.id !== Number(id));
  res.sendStatus(204);
});

app.post('/products', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    res.sendStatus(400);
    return;
  }

  const newProduct = {
    id: Number(new Date()),
    title,
  };
  products.push(newProduct);

  res.status(201).send(newProduct);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
