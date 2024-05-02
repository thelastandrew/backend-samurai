import { Response, Request, Router } from 'express';
import { HTTP_STATUSES } from '../constants';
import { testRepository } from '../repositories/testRepository';

export const getTestsRouter = () => {
  const router = Router();

  router.delete('/products', (_: Request, res: Response) => {
    testRepository.clearProducts();
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  
  return router;
}