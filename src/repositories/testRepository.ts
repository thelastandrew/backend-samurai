import { db } from '../db';

export const testRepository = {
  clearProducts: () => {
    db.products = [];
  },
};
