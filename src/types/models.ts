import { ProductType } from './common';

export type ProductViewModel = { id: number, title: string };
export type ProductCreateModel = Omit<ProductType, 'id'>;
export type ProductUpdateModel = Partial<ProductCreateModel>;
export type GetProductsQueryModel = Partial<Pick<ProductType, 'title'>>;
export type ProductUriParamsIdModel = { id: string };