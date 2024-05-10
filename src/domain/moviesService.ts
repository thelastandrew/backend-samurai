import { DEFAULT_PAGE, PAGE_SIZE } from '../constants';
import { moviesRepository } from '../repositories/moviesRepository';
import { MoviesResponse } from '../types';

export const moviesService = {
  getAllMovies: async (page?: number): Promise<MoviesResponse> => {
    const _page = page ? page - 1 : DEFAULT_PAGE;
    const skip = _page * PAGE_SIZE;

    const { totalCount, movies } = await moviesRepository.getAllMovies(skip);
    const pagesCount = Math.ceil(totalCount / PAGE_SIZE);
    const prevPage = !page || page === 1 ? null : page - 1;
    const nextPage =
      !page || page === 1 ? 2 : page === pagesCount ? null : page + 1;

    return { totalCount, pagesCount, nextPage, prevPage, movies };
  },
};
