import { ProductCreateModel, ProductUpdateModel, ProductViewModel } from "../types";

export enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,

  BAD_REQUEST_400 = 400,
  NOT_FOUND_404 = 404,
}

export enum DATABASES {
  MY_DB = 'my-db'
}

export enum MY_DB_COLLECTIONS {
  PRODUCTS = 'products',
}

export type ProductsRepositoryType = {
  getAllProducts: (title?: string) => Promise<ProductViewModel[]>;
  getProduct: (id: number) => Promise<ProductViewModel | null>;
  createNewProduct: (productData: ProductCreateModel) => Promise<ProductViewModel>;
  updateProduct: (id: number, productData: ProductUpdateModel) => Promise<ProductViewModel | null>;
  deleteProduct: (id: number) => Promise<void>;
};

export enum ROUTES {
  PRODUCTS = '/products',
  PRODUCTS_DB = '/products-db',
  TEST = '/__test__',
}
