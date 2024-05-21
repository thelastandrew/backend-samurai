import { Response, Router } from 'express';
import { MailViewModel, RequestWithBody } from '../types';
import { emailAdapter } from '../adapters';
import { HTTP_STATUSES } from '../constants';
import {
  badRequestValidationMiddleware,
  requiredBodyEmailValidation,
  requiredBodyMessageValidation,
  requiredBodySubjectValidation,
} from '../middlewares';

export const getMailRouter = () => {
  const router = Router();

  router.post(
    '/',
    requiredBodyEmailValidation,
    requiredBodySubjectValidation,
    requiredBodyMessageValidation,
    badRequestValidationMiddleware,
    async (req: RequestWithBody<MailViewModel>, res: Response) => {
      const { email, subject, message } = req.body;
      try {
        const info = await emailAdapter.sendEmail(email, subject, message);

        res.json(info.response);
      } catch (error) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ error });
      }
    }
  );

  return router;
};
