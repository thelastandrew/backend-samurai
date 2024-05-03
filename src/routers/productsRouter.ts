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
import { HTTP_STATUSES } from '../constants';
import { productsRepository } from '../repositories';
import {
  badRequestValidationMiddleware,
  optionalBodyPriceValidation,
  optionalBodyTitleValidation,
  requiredBodyPriceValidation,
  requiredBodyTitleValidation,
} from '../middlewares';

export const getProductsRouter = () => {
  const router = Router();

  router.get(
    '/',
    (
      req: RequestWithQuery<GetProductsQueryModel>,
      res: Response<ProductViewModel[]>
    ) => {
      const { title } = req.query;
      res.json(productsRepository.getAllProducts(title));
    }
  );

  router.get(
    '/:id',
    (
      req: RequestWithParams<ProductUriParamsIdModel>,
      res: Response<ProductViewModel>
    ) => {
      const product = productsRepository.getProduct(Number(req.params.id));

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
    (
      req: RequestWithBody<ProductCreateModel>,
      res: Response<ProductViewModel>
    ) => {
      const { title, price } = req.body;

      const newProduct = productsRepository.createNewProduct({ title, price });
      res.status(HTTP_STATUSES.CREATED_201).json(newProduct);
    }
  );

  router.put(
    '/:id',
    optionalBodyTitleValidation,
    optionalBodyPriceValidation,
    badRequestValidationMiddleware,
    (
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

      const updatedProduct = productsRepository.updateProduct(
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
    (req: RequestWithParams<ProductUriParamsIdModel>, res: Response) => {
      const idNum = Number(req.params.id);
      const product = productsRepository.getProduct(idNum);

      if (!product) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      productsRepository.deleteProduct(idNum);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  return router;
};

