import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { HTTP_STATUSES } from './constants/statusCodes';
import { ProductType } from './types/common';
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from './types/requestTypes';
import {
  GetProductsQueryModel,
  ProductCreateModel,
  ProductUriParamsIdModel,
  ProductUpdateModel,
  ProductViewModel,
} from './types/models';

export const app = express();
const port = process.env.PORT || 3000;
const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

let products: ProductType[] = [
  { id: 1, title: 'tomato', price: 2 },
  { id: 2, title: 'orange', price: 5 },
];

const bodyParserJsonMiddleware = bodyParser.json();

app.use(bodyParserJsonMiddleware);

const getProductViewModel = (product: ProductType): ProductViewModel => ({ id: product.id, title: product.title });

app.get('/products', (
  req: RequestWithQuery<GetProductsQueryModel>,
  res: Response<ProductViewModel[]>,
) => {
  const { title } = req.query;
  if (!title) {
    res.json(products.map(getProductViewModel));
    return;
  }

  res.json(products
    .filter((p) => p.title.indexOf(title) > -1)
    .map(getProductViewModel)
  );
});

app.get('/products/:id', (
  req: RequestWithParams<ProductUriParamsIdModel>,
  res: Response<ProductViewModel>,
) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.json(getProductViewModel(product));
});

app.delete('/products/:id', (
  req: RequestWithParams<ProductUriParamsIdModel>,
  res: Response,
) => {
  const { id } = req.params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  products = products.filter((p) => p.id !== Number(id));
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.post('/products', (
  req: RequestWithBody<ProductCreateModel>,
  res: Response<ProductViewModel>,
) => {
  const { title, price } = req.body;
  if (!title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const newProduct: ProductType = {
    id: Number(new Date()),
    title,
    price,
  };
  products.push(newProduct);

  res.status(HTTP_STATUSES.CREATED_201).json(getProductViewModel(newProduct));
});

app.put('/products/:id', (
  req: RequestWithParamsAndBody<ProductUriParamsIdModel, ProductUpdateModel>,
  res: Response<ProductViewModel>,
) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const { title, price } = req.body;
  if (!title && !price) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  product.title = title ?? product.title;
  product.price = price ?? product.price;
  res.json(getProductViewModel(product));
});

app.delete('/__test__/products', (_: Request, res: Response) => {
  products = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
