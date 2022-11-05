import express from 'express';
import Locals from './Locals';
import Routes from './Routes';
import middleware from '../middlewares/index';
//  import ExceptionHandler from '../exception/Handler';
import bodyParser from 'body-parser';
import multer from 'multer'

class Express {
    /**
     * Create the express object
     */
    public express: express.Application;
    public router: express.Router;
    /**
     * Initializes the express server
     */
    constructor() {
        this.express = express();

        this.mountDotEnv();
        this.mountMiddlewares();
        this.mountRoutes();
    }

    private mountDotEnv(): void {
        this.express = Locals.init(this.express);
    }

    /**
     * Mounts all the defined middlewares
     */
    private mountMiddlewares(): void {
        this.express = middleware.init(this.express);
    }

    /**
     * Mounts all the defined routes
     */
    private mountRoutes(): void {
        this.express = Routes.mountWeb(this.express);
    }

    /**
     * Starts the express server
     */
    public init(): any {
        const port: number = 3000;
        // parse various different custom JSON types as JSON

        // parse application/x-www-form-urlencoded
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(express.json())
        // parse application/json
        this.express.use(bodyParser.json())
        // this.express.use(multer().single('file'))

        // Registering Exception / Error Handlers
        //  this.express.use(ExceptionHandler.logErrors);
        //  this.express.use(ExceptionHandler.clientErrorHandler);
        //  this.express.use(ExceptionHandler.errorHandler);
        //  this.express = ExceptionHandler.notFoundHandler(this.express);

        // Start the server on the specified port
        this.express.listen(port, () => {
            this.express = Routes.mountApi(this.express);
            return console.log(`Server :: Running port ${port}`);
        }).on('error', (_error) => {
            return console.log('Error: ', _error.message);
        });;
    }
}


/** Export the express module */
export default new Express;
