import express from 'express';
import bodyParser from 'body-parser';
import { getProductsRouter } from './routes/products';
import { getTestsRouter } from './routes/tests';
import { db } from './db/db';

export const app = express();

const bodyParserJsonMiddleware = bodyParser.json();
const jsonBodyMiddleware = express.json();

app.use(bodyParserJsonMiddleware);
app.use(jsonBodyMiddleware);
app.use('/products', getProductsRouter(db));
app.use('/__test__', getTestsRouter(db));
