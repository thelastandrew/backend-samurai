import { Response, Request, Router } from 'express';
import { testRepository } from '../repositories';
import { HTTP_STATUSES, ROUTES } from '../constants';

export const getTestsRouter = () => {
  const router = Router();

  router.delete(ROUTES.PRODUCTS, async (_: Request, res: Response) => {
    await testRepository.clearProducts();
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
