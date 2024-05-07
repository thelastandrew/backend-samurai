import { Response, Router } from 'express';
import {
  GetProductsQueryModel,
  ProductCreateModel,
  ProductUpdateModel,
  ProductUriParamsIdModel,
  ProductViewModel,
  ProductsServiceType,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from '../types';
import { HTTP_STATUSES } from '../constants';
import {
  badRequestValidationMiddleware,
  optionalBodyPriceValidation,
  optionalBodyTitleValidation,
  requiredBodyPriceValidation,
  requiredBodyTitleValidation,
} from '../middlewares';

export const getProductsRouter = (productsService: ProductsServiceType) => {
  const router = Router();

  router.get(
    '/',
    async (
      req: RequestWithQuery<GetProductsQueryModel>,
      res: Response<ProductViewModel[]>
    ) => {
      const { title } = req.query;
      const products = await productsService.getAllProducts(title);
      res.json(products);
    }
  );

  router.get(
    '/:id',
    async (
      req: RequestWithParams<ProductUriParamsIdModel>,
      res: Response<ProductViewModel>
    ) => {
      const product = await productsService.getProduct(Number(req.params.id));

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

      const newProduct = await productsService.createNewProduct({
        title,
        price,
      });
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

      const isSuccess = await productsService.updateProduct(
        Number(req.params.id),
        req.body
      );

      if (!isSuccess) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  router.delete(
    '/:id',
    async (req: RequestWithParams<ProductUriParamsIdModel>, res: Response) => {
      const idNum = Number(req.params.id);
      const product = await productsService.getProduct(idNum);

      if (!product) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      await productsService.deleteProduct(idNum);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  return router;
};

