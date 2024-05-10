import { MovieType, MovieViewModel } from '../types';

export const getMovieViewModel = (movie: MovieType): MovieViewModel => {
  const { _id, title, year, directors, writers, plot } = movie;

  return { _id, title, year, directors, writers, plot };
};
