import { Express, Response } from 'express';
import { DbType, ProductType } from '../types/common';
import {
  GetProductsQueryModel,
  ProductCreateModel,
  ProductUpdateModel,
  ProductUriParamsIdModel,
  ProductViewModel,
} from '../types/models';
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from '../types/requestTypes';
import { HTTP_STATUSES } from '../constants/statusCodes';

const getProductViewModel = (product: ProductType): ProductViewModel => ({ id: product.id, title: product.title });

export const addProductsRoutes = (app: Express, db: DbType) => {
  app.get('/products', (
    req: RequestWithQuery<GetProductsQueryModel>,
    res: Response<ProductViewModel[]>,
  ) => {
    const { title } = req.query;
    if (!title) {
      res.json(db.products.map(getProductViewModel));
      return;
    }
  
    res.json(db.products
      .filter((p) => p.title.indexOf(title) > -1)
      .map(getProductViewModel)
    );
  });
  
  app.get('/products/:id', (
    req: RequestWithParams<ProductUriParamsIdModel>,
    res: Response<ProductViewModel>,
  ) => {
    const product = db.products.find((p) => p.id === Number(req.params.id));
  
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
  
    const product = db.products.find((p) => p.id === Number(id));
  
    if (!product) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
  
    db.products = db.products.filter((p) => p.id !== Number(id));
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
    db.products.push(newProduct);
  
    res.status(HTTP_STATUSES.CREATED_201).json(getProductViewModel(newProduct));
  });
  
  app.put('/products/:id', (
    req: RequestWithParamsAndBody<ProductUriParamsIdModel, ProductUpdateModel>,
    res: Response<ProductViewModel>,
  ) => {
    const { id } = req.params;
    const product = db.products.find((p) => p.id === Number(id));
  
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
};