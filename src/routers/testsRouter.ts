import { Response, Request, Router } from 'express';
import { HTTP_STATUSES } from '../constants';
import { DbType } from '../types';

export const getTestsRouter = (db: DbType) => {
  const router = Router();

  router.delete('/products', (_: Request, res: Response) => {
    db.products = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  
  return router;
}