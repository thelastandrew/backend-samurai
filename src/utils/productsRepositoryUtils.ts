import { ProductType, ProductViewModel } from '../types';

export const getProductViewModel = (product: ProductType): ProductViewModel => ({ id: product.id, title: product.title });
