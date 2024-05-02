import express from 'express';
import bodyParser from 'body-parser';
import { getProductsRouter, getTestsRouter } from './routers';
import { db } from './db';

export const app = express();

const bodyParserJsonMiddleware = bodyParser.json();
const jsonBodyMiddleware = express.json();

app.use(bodyParserJsonMiddleware);
app.use(jsonBodyMiddleware);
app.use('/products', getProductsRouter(db));
app.use('/__test__', getTestsRouter(db));
