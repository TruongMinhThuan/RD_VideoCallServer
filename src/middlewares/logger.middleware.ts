import { NextFunction, Request, Response } from "express"


const logger = (req:Request,res:Response,next:NextFunction)=>{
    console.log('====================================');
    console.log('logger middleware 11:: ',req.baseUrl);
    console.log('====================================');

    next()
}


export default logger