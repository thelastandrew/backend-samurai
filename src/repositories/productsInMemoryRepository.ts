import { ProductsRepositoryType } from '../types';
import { db } from '../db';
import { ProductCreateModel, ProductType, ProductUpdateModel } from '../types';
import { getProductViewModel } from '../utils';

export const productsInMemoryRepository: ProductsRepositoryType = {
  getAllProducts: async (title?: string) => {
    if (!title) {
      return db.products.map(getProductViewModel);
    }

    return db.products
      .filter((p) => p.title.indexOf(title) > -1)
      .map(getProductViewModel);
  },

  getProduct: async (id: number) => {
    const foundProduct = db.products.find((p) => p.id === id);

    if (!foundProduct) return null;

    return getProductViewModel(foundProduct);
  },

  createNewProduct: async (productData: ProductCreateModel) => {
    const { title, price } = productData;
    const newProduct: ProductType = {
      id: Number(new Date()),
      title,
      price,
    };
    db.products.push(newProduct);

    return getProductViewModel(newProduct);
  },

  updateProduct: async (id: number, productData: ProductUpdateModel) => {
    const foundProduct = db.products.find((p) => p.id === id);
    if (!foundProduct) return false;

    const { title, price } = productData;

    foundProduct.title = title ?? foundProduct.title;
    foundProduct.price = price ?? foundProduct.price;

    return true;
  },

  deleteProduct: async (id: number) => {
    db.products = db.products.filter((p) => p.id !== id);
  },
};
