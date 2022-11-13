// import * as jwt from 'jsonwebtoken';

import AuthenticationService from '../../../services/AuthenticationService';
import { Response, Request, NextFunction } from 'express';
import BaseController from '../BaseController';

class AuthenticationController extends BaseController {
  private auth: AuthenticationService;

  constructor() {
    super();
    this.auth = new AuthenticationService()
  }

  async login(req: Request, res: Response) {
    try {
      const user = await this.auth.login(req.body);
      return res.json(user).status(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.auth.register(req.body);
      return res.json(user).status(201);
    } catch (error) {
      return res.sendStatus(404)
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      return res.send(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

export default new AuthenticationController();
