import { db } from '../db';

export const testRepository = {
  clearProducts: async () => {
    db.products = [];
  },
};
