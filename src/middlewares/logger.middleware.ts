import { NextFunction, Request, Response } from "express"


const logger = (req:Request,res:Response,next:NextFunction)=>{
    console.log('====================================');
    console.log('logger middleware');
    console.log('====================================');

    next()
}


export default logger