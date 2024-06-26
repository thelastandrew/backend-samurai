import { NextFunction, Request, Response } from 'express';
import { validationResult, body, query } from 'express-validator';
import {
  HTTP_STATUSES,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  pageErrorMEssage,
  priceErrorMsg,
  titleLengthErrorMsg,
  titleRequiredErrorMsg,
} from '../constants';

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

const lengthValidation = (min: number, max: number) => ({ min, max });
const titleLength = lengthValidation(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);

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

export const pageQueryValidation = query('page')
  .optional()
  .isInt({ min: 1 })
  .withMessage(pageErrorMEssage);

export const requiredBodyEmailValidation = body('email')
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Email is not valid');

export const requiredBodySubjectValidation = body('subject')
  .notEmpty()
  .withMessage('Subject is required')
  .isLength({ min: 2, max: 30 })
  .withMessage('Subject must have length from 2 to 30');

export const requiredBodyMessageValidation = body('message')
  .notEmpty()
  .withMessage('Message is required')
  .isLength({ min: 2, max: 300 })
  .withMessage('Message must have length from 2 t0 300');
