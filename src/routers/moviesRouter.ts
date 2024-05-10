import { Router, Response } from 'express';
import {
  GetMovieQueryModel,
  MovieType,
  MovieUriParamsModel,
  MoviesResponse,
  RequestWithParams,
  RequestWithQuery,
} from '../types';
import {
  badRequestValidationMiddleware,
  pageQueryValidation,
} from '../middlewares';
import { moviesService } from '../domain/moviesService';
import { HTTP_STATUSES } from '../constants';

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

  router.get(
    '/:id',
    async (
      req: RequestWithParams<MovieUriParamsModel>,
      res: Response<MovieType>
    ) => {
      const movie = await moviesService.getMovie(req.params.id);

      if (!movie) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      res.json(movie);
    }
  );

  return router;
};
