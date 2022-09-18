/**
 * Define all your routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

 import { Application } from 'express';
 import Locals from './Locals';
 import Logs from '../middlewares/Logs';
 
 import apiRouter from './../routes/Api';
 
 class Routes {
     public mountWeb(_express: Application): Application {
         Logs.info('Routes :: Mounting Web Routes...');
 
         return 
     }
 
     public mountApi(_express: Application): Application {
         const apiPrefix = Locals.config().apiPrefix;
         Logs.info('Routes :: Mounting API Routes...');
 
         return _express.use(`/${apiPrefix}`, apiRouter);
     }
 }
 
 export default new Routes;
 