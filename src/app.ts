import express from 'express';
import bodyParser from 'body-parser';
import { getProductsRouter, getTestsRouter } from './routers';
import { productsInMemoryRepository } from './repositories';
import { ROUTES } from './constants';

export const app = express();

const bodyParserJsonMiddleware = bodyParser.json();
const jsonBodyMiddleware = express.json();

app.use(bodyParserJsonMiddleware);
app.use(jsonBodyMiddleware);
app.use(ROUTES.PRODUCTS, getProductsRouter(productsInMemoryRepository));
app.use(ROUTES.TEST, getTestsRouter());
