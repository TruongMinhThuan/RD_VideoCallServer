import * as yup from 'yup';
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';


const RequestValidation = (schema: yup.BaseSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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
}

export {RequestValidation}