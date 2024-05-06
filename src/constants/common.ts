import { ProductCreateModel, ProductUpdateModel, ProductViewModel } from '../types';

export enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,

  BAD_REQUEST_400 = 400,
  NOT_FOUND_404 = 404,
}

export enum DATABASES {
  MY_DB = 'my-db',
  SAMPLE_MFLIX = 'sample_mflix',
}

export enum MY_DB_COLLECTIONS {
  PRODUCTS = 'products',
}

export enum SAMPLE_MFLIX_COLLECTIONS {
  COMMENTS = 'comments',
  EMBEDDED_MOVIES = 'embedded_movies',
  MOVIES = 'movies',
  SESSIONS = 'sessions',
  THEATERS = 'theaters',
  USERS = 'users'
}

export type ProductsRepositoryType = {
  getAllProducts: (title?: string) => Promise<ProductViewModel[]>;
  getProduct: (id: number) => Promise<ProductViewModel | null>;
  createNewProduct: (productData: ProductCreateModel) => Promise<ProductViewModel>;
  updateProduct: (id: number, productData: ProductUpdateModel) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<void>;
};

export enum ROUTES {
  PRODUCTS = '/products',
  PRODUCTS_DB = '/products-db',
  TEST = '/__test__',
}

export const MIN_TITLE_LENGTH = 2;
export const MAX_TITLE_LENGTH = 30;
export const titleLengthErrorMsg = `Title length must be from ${MIN_TITLE_LENGTH} to ${MAX_TITLE_LENGTH} characters`;
export const titleRequiredErrorMsg = 'Title property is required';
export const priceErrorMsg = 'Price must be an integer';
