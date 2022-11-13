import { NextFunction, Request, Response } from "express"


const logger = (req:Request,res:Response,next:NextFunction)=>{
    console.log('input:: ',);
    
    next()
}


export default logger