import { NextFunction, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import { HTTP_STATUSES } from '../constants';

const exceptionMiddleware =
  (status: HTTP_STATUSES) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(status).json({ errors: result.array() });
      return;
    }
    next();
  };

export const badRequestValidationMiddleware = exceptionMiddleware(
  HTTP_STATUSES.BAD_REQUEST_400
);

export const notFoundValidationMiddleware = exceptionMiddleware(
  HTTP_STATUSES.NOT_FOUND_404
);

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 30;
const lengthValidation = (min: number, max: number) => ({ min, max });
const titleLength = lengthValidation(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
const titleLengthErrorMsg = `Title length must be from ${MIN_TITLE_LENGTH} to ${MAX_TITLE_LENGTH} charakters`;
const titleRequiredErrorMsg = 'Title property is reqiored';
const priceErrorMsg = 'Price must be an integer';

export const requiredBodyTitleValidation = body('title')
  .notEmpty()
  .withMessage(titleRequiredErrorMsg)
  .isLength(titleLength)
  .withMessage(titleLengthErrorMsg);

export const optionalBodyTitleValidation = body('title')
  .optional()
  .notEmpty()
  .withMessage(titleRequiredErrorMsg)
  .isLength(titleLength)
  .withMessage(titleLengthErrorMsg);

export const requiredBodyPriceValidation = body('price')
  .notEmpty()
  .withMessage('Price property is required')
  .isNumeric()
  .withMessage(priceErrorMsg);
export const optionalBodyPriceValidation = body('price')
  .optional()
  .isNumeric()
  .withMessage(priceErrorMsg);
