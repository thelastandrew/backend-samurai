import { Express, Response, Request } from 'express';
import { HTTP_STATUSES } from '../constants/statusCodes';
import { DbType } from '../types/common';

export const addTestsRouts = (app: Express, db: DbType) => {
  app.delete('/__test__/products', (_: Request, res: Response) => {
    db.products = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  
}