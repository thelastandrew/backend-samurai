import { Router } from 'express';
import { HTTP_STATUSES } from '../constants';
import { moviesCollection } from '../db';
import { RequestWithQuery } from '../types';

const mapMovie = (dbMovie: any) => {
  const { _id, title, year, directors, writers, plot } = dbMovie;

  return { _id, title, year, directors, writers, plot };
};

export const getMoviesRouter = () => {
  const router = Router();

  router.get('/', async (req: RequestWithQuery<{ page?: number }>, res) => {
    const pageSize = 5;
    let defaultPage = 0;
    let { page } = req.query;

    if (page && page < 1) {
      res
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        .json({ message: 'Page must be greater or equel to 1' });

      return;
    }

    if (page && page > 0) defaultPage = page - 1;
    page = Number(page);
    const skip = pageSize * defaultPage;
    const movies = await moviesCollection
      .find({})
      .skip(skip)
      .limit(pageSize)
      .toArray();
    const totalCount = await moviesCollection.countDocuments();
    const pagesCount = Math.ceil(totalCount / pageSize);
    const prevPage = !page || page === 1 ? null : page - 1;
    const nextPage =
      !page || page === 1 ? 1 : page === pagesCount ? null : page + 1;
    const mappedMovies = movies.map(mapMovie);

    res.status(HTTP_STATUSES.OK_200).json({
      totalCount,
      pagesCount,
      prevPage,
      nextPage,
      movies: mappedMovies,
    });
  });

  return router;
};
