
import { Application } from 'express';
import {verifyToken} from './auth.middleware';
import logger from './logger.middleware';

export default class Middleware{
    public static init(_express:Application){
        _express.use(logger)
        // _express.use(verifyToken)
        return _express
    }
}
