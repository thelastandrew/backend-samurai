import {
  MovieViewModel,
  ProductCreateModel,
  ProductUpdateModel,
  ProductViewModel,
} from './models';

export type ProductType = {
  id: number;
  title: string;
  price: number;
};

export type MovieType = {
  _id: string;
  plot: string;
  genres: string[];
  title: string;
  released: Date;
  year: number;
  directors: string[];
  writers?: string[];
};

export type DbType = {
  products: ProductType[];
};

export type MoviesResponse = {
  totalCount: number;
  pagesCount: number;
  nextPage: number | null;
  prevPage: number | null;
  movies: MovieViewModel[];
};

export type ProductsRepositoryType = {
  getAllProducts: (title?: string) => Promise<ProductViewModel[]>;
  getProduct: (id: number) => Promise<ProductViewModel | null>;
  createNewProduct: (newProduct: ProductType) => Promise<ProductViewModel>;
  updateProduct: (
    id: number,
    productData: ProductUpdateModel
  ) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<void>;
};

export type ProductsServiceType = {
  getAllProducts: (title?: string) => Promise<ProductViewModel[]>;
  getProduct: (id: number) => Promise<ProductViewModel | null>;
  createNewProduct: (
    productData: ProductCreateModel
  ) => Promise<ProductViewModel>;
  updateProduct: (
    id: number,
    productData: ProductUpdateModel
  ) => Promise<boolean>;
  deleteProduct: (id: number) => void;
};

