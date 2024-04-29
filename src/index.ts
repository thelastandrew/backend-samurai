import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { HTTP_STATUSES } from './constants/statusCodes';

export const app = express();
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
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.send(product);
});

app.delete('/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  products = products.filter((p) => p.id !== Number(id));
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.post('/products', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const newProduct = {
    id: Number(new Date()),
    title,
  };
  products.push(newProduct);

  res.status(HTTP_STATUSES.CREATED_201).send(newProduct);
});

app.put('/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const { title } = req.body;
  if (!title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  product.title = title;
  res.send(product);
});

app.delete('/__test__/products', (_: Request, res: Response) => {
  products = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
