/**
 * Define all your routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

 import { Application } from 'express';
 import Locals from './Locals';
 import apiRouter from './../routes/Api';
 
 class Routes {
     public mountWeb(_express: Application): Application {
        //  Logs.info('Routes :: Mounting Web Routes...');
 
         return _express
     }
 
     public mountApi(_express: Application): Application {
         const apiPrefix = Locals.config().apiPrefix || 'api';
        //  Logs.info('Routes :: Mounting API Routes...');
        console.log('conntected to API');
        
         return _express.use(`/${apiPrefix}`, apiRouter);
     }
 }
 
 export default new Routes;
 