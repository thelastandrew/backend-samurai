export type ProductType = {
  id: number,
  title: string,
  price: number,
};

export type DbType = {
  products: ProductType[]
}
