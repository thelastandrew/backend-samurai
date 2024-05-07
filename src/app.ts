import express from 'express';
import bodyParser from 'body-parser';
import { getProductsRouter, getTestsRouter } from './routers';
import {
  productsInMemoryRepository,
  productsDbRepository,
} from './repositories';
import { ROUTES } from './constants';
import { getProductsService } from './domain';

export const app = express();

const bodyParserJsonMiddleware = bodyParser.json();
const jsonBodyMiddleware = express.json();

const productsInMemoryService = getProductsService(productsInMemoryRepository);
const productsDbService = getProductsService(productsDbRepository);

app.use(bodyParserJsonMiddleware);
app.use(jsonBodyMiddleware);
app.use(ROUTES.PRODUCTS, getProductsRouter(productsInMemoryService));
app.use(ROUTES.PRODUCTS_DB, getProductsRouter(productsDbService));
app.use(ROUTES.TEST, getTestsRouter());

