
import { Application } from 'express';
import logger from './logger.middleware';

export default class Middleware{
    public static init(_express:Application){
        _express.use(logger)
        return _express
    }
}
