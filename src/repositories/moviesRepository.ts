import { PAGE_SIZE } from '../constants';
import { moviesCollection } from '../db';
import { getMovieViewModel } from '../utils/moviesRepositoryUtils';

export const moviesRepository = {
  getAllMovies: async (skip: number) => {
    const movies = await moviesCollection
      .find({})
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();
    const totalCount = await moviesCollection.countDocuments();

    return { totalCount, movies: movies.map(getMovieViewModel) };
  },
};
