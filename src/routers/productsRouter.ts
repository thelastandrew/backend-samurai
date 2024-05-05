import { Response, Router } from 'express';
import {
  GetProductsQueryModel,
  ProductCreateModel,
  ProductUpdateModel,
  ProductUriParamsIdModel,
  ProductViewModel,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from '../types';
import { HTTP_STATUSES, ProductsRepositoryType } from '../constants';
import {
  badRequestValidationMiddleware,
  optionalBodyPriceValidation,
  optionalBodyTitleValidation,
  requiredBodyPriceValidation,
  requiredBodyTitleValidation,
} from '../middlewares';

export const getProductsRouter = (repository: ProductsRepositoryType) => {
  const router = Router();

  router.get(
    '/',
    async (
      req: RequestWithQuery<GetProductsQueryModel>,
      res: Response<ProductViewModel[]>
    ) => {
      const { title } = req.query;
      const products = await repository.getAllProducts(title);
      res.json(products);
    }
  );

  router.get(
    '/:id',
    async (
      req: RequestWithParams<ProductUriParamsIdModel>,
      res: Response<ProductViewModel>
    ) => {
      const product = await repository.getProduct(Number(req.params.id));

      if (!product) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      res.json(product);
    }
  );

  router.post(
    '/',
    requiredBodyTitleValidation,
    requiredBodyPriceValidation,
    badRequestValidationMiddleware,
    async (
      req: RequestWithBody<ProductCreateModel>,
      res: Response<ProductViewModel>
    ) => {
      const { title, price } = req.body;

      const newProduct = await repository.createNewProduct({ title, price });
      res.status(HTTP_STATUSES.CREATED_201).json(newProduct);
    }
  );

  router.put(
    '/:id',
    optionalBodyTitleValidation,
    optionalBodyPriceValidation,
    badRequestValidationMiddleware,
    async (
      req: RequestWithParamsAndBody<
        ProductUriParamsIdModel,
        ProductUpdateModel
      >,
      res: Response<ProductViewModel>
    ) => {
      const { title, price } = req.body;
      if (!title && !price) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const updatedProduct = await repository.updateProduct(
        Number(req.params.id),
        req.body
      );

      if (!updatedProduct) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      res.json(updatedProduct);
    }
  );

  router.delete(
    '/:id',
    async (req: RequestWithParams<ProductUriParamsIdModel>, res: Response) => {
      const idNum = Number(req.params.id);
      const product = await repository.getProduct(idNum);

      if (!product) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      await repository.deleteProduct(idNum);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  return router;
};

