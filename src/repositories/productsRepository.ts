import { db } from '../db';
import { ProductCreateModel, ProductType, ProductUpdateModel, ProductViewModel } from '../types';

const getProductViewModel = (product: ProductType): ProductViewModel => ({ id: product.id, title: product.title });

export const productsRepository = {
  getAllProducts: (title?: string) => {
    if (!title) {
      return db.products.map(getProductViewModel);
    }

    return db.products
    .filter((p) => p.title.indexOf(title) > -1)
    .map(getProductViewModel);
  },

  getProduct: (id: number) => {
    const foundProduct = db.products.find((p) => p.id === id);

    if (!foundProduct) return null;

    return getProductViewModel(foundProduct);
  },

  createNewProduct: (productData: ProductCreateModel) => {
    const { title, price } = productData;
    const newProduct: ProductType = {
      id: Number(new Date()),
      title,
      price,
    };
    db.products.push(newProduct);

    return getProductViewModel(newProduct);
  },

  updateProduct: (id: number, productData: ProductUpdateModel) => {
    const foundProduct = db.products.find((p) => p.id === id);
    if (!foundProduct) return null;

    const { title, price } = productData;

    foundProduct.title = title ?? foundProduct.title;
    foundProduct.price = price ?? foundProduct.price;

    return getProductViewModel(foundProduct);
  },

  deleteProduct: (id: number) => {
    db.products = db.products.filter((p) => p.id !== id);
  },
};