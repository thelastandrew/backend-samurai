import { ProductsRepositoryType, ProductsServiceType } from '../types';
import { ProductCreateModel, ProductType, ProductUpdateModel } from '../types';

export const getProductsService = (
  repository: ProductsRepositoryType
): ProductsServiceType => ({
  getAllProducts: (title?: string) => {
    return repository.getAllProducts(title);
  },

  getProduct: (id: number) => {
    return repository.getProduct(id);
  },

  createNewProduct: (productData: ProductCreateModel) => {
    const { title, price } = productData;
    const newProduct: ProductType = {
      id: Number(new Date()),
      title,
      price,
    };

    return repository.createNewProduct(newProduct);
  },

  updateProduct: (id: number, productData: ProductUpdateModel) => {
    return repository.updateProduct(id, productData);
  },

  deleteProduct: (id: number) => {
    repository.deleteProduct(id);
  },
});
