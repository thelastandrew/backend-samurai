import { Router, Request, Response } from 'express';
import { myDbUsersCollection } from '../db';

export const getUsersRouter = () => {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const { login, password } = req.body;
    await myDbUsersCollection.insertOne({ login, password });
    res.sendStatus(201);
  });

  return router;
};
