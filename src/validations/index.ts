import * as yup from 'yup';
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

export const validate =
  (schema: yup.BaseSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res.status(500).json({
        type: error.name,
        message: error?.message,
      });
    }
  };
