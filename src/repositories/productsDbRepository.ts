import { myDbProductsCollection } from '../db';
import {
  ProductType,
  ProductUpdateModel,
  ProductsRepositoryType,
} from '../types';
import { getProductViewModel } from '../utils';

export const productsDbRepository: ProductsRepositoryType = {
  getAllProducts: async (title?: string) => {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    const foundProducts = await myDbProductsCollection.find(filter).toArray();

    return foundProducts.map(getProductViewModel);
  },

  getProduct: async (id: number) => {
    const foundProduct = await myDbProductsCollection.findOne({ id });

    return foundProduct ? getProductViewModel(foundProduct) : null;
  },

  createNewProduct: async (newProduct: ProductType) => {
    await myDbProductsCollection.insertOne(newProduct);

    return getProductViewModel(newProduct);
  },

  updateProduct: async (id: number, productData: ProductUpdateModel) => {
    const { matchedCount } = await myDbProductsCollection.updateOne(
      { id },
      { $set: productData }
    );

    return matchedCount === 1;
  },

  deleteProduct: async (id: number) => {
    await myDbProductsCollection.deleteOne({ id });
  },
};
