import { Request, Response, NextFunction } from 'express';

abstract class BaseController {
  handleSuccess(res: Response, message: string) {
    return res.sendStatus(200);
  }

  handleFail(res: Response) {
    return res.sendStatus(404);
  }
}

export default BaseController;
