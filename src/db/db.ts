import { ProductType, DbType } from '../types/common';

const products: ProductType[] = [
  { id: 1, title: 'tomato', price: 2 },
  { id: 2, title: 'orange', price: 5 },
];

export const db: DbType = {
  products,
};
