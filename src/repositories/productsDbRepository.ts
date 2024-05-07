import { ProductsRepositoryType } from '../constants';
import { myDbProductsCollection } from '../db';
import { ProductCreateModel, ProductType, ProductUpdateModel } from '../types';
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
    await myDbProductsCollection.insertOne(newProduct);

    return getProductViewModel(newProduct);
  },

  updateProduct: async (id: number, productData: ProductUpdateModel) => {
    const productToUpdate: ProductUpdateModel = {};
    const { title, price } = productData;
    if (title) productToUpdate.title = title;
    if (price) productToUpdate.price = price;

    const { matchedCount } = await myDbProductsCollection.updateOne(
      { id },
      { $set: productToUpdate }
    );

    return matchedCount === 1;
  },

  deleteProduct: async (id: number) => {
    await myDbProductsCollection.deleteOne({ id });
  },
};
