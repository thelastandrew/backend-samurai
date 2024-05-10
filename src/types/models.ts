import { ProductType, MovieType } from './common';

export type ProductViewModel = Pick<ProductType, 'id' | 'title'>;
export type ProductCreateModel = Omit<ProductType, 'id'>;
export type ProductUpdateModel = Partial<ProductCreateModel>;
export type GetProductsQueryModel = Partial<Pick<ProductType, 'title'>>;
export type ProductUriParamsIdModel = { id: string };

export type MovieViewModel = Pick<
  MovieType,
  '_id' | 'title' | 'year' | 'directors' | 'writers' | 'plot'
>;
export type GetMovieQueryModel = { page?: number };
