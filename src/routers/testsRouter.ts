import { Response, Request, Router } from 'express';
import { HTTP_STATUSES, ROUTES } from '../constants';
import { testRepository } from '../repositories';

export const getTestsRouter = () => {
  const router = Router();

  router.delete(ROUTES.PRODUCTS, async (_: Request, res: Response) => {
    await testRepository.clearProducts();
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  
  return router;
}