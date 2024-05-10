import { Router, Response } from 'express';
import { GetMovieQueryModel, MoviesResponse, RequestWithQuery } from '../types';
import {
  badRequestValidationMiddleware,
  pageQueryValidation,
} from '../middlewares';
import { moviesService } from '../domain/moviesService';

export const getMoviesRouter = () => {
  const router = Router();

  router.get(
    '/',
    pageQueryValidation,
    badRequestValidationMiddleware,
    async (
      req: RequestWithQuery<GetMovieQueryModel>,
      res: Response<MoviesResponse>
    ) => {
      let { page } = req.query;

      const result = await moviesService.getAllMovies(Number(page));
      res.json(result);
    }
  );

  return router;
};
