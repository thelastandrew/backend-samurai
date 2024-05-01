import express from 'express';
import bodyParser from 'body-parser';
import { addProductsRoutes } from './routes/products';
import { addTestsRouts } from './routes/tests';
import { db } from './db/db';

export const app = express();

const bodyParserJsonMiddleware = bodyParser.json();
const jsonBodyMiddleware = express.json();

app.use(bodyParserJsonMiddleware);
app.use(jsonBodyMiddleware);

addProductsRoutes(app, db);
addTestsRouts(app, db);
