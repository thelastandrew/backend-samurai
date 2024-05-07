import {
  ProductCreateModel,
  ProductUpdateModel,
  ProductViewModel,
} from './models';

export type ProductType = {
  id: number;
  title: string;
  price: number;
};

export type DbType = {
  products: ProductType[];
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

