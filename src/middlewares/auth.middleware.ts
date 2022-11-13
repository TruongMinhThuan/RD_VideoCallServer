import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string =
            req.body?.token || req.query?.token || req.header('Authorization')



        const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret');
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
}

export const isAuth = (req?: Request, res?: Response, next?: NextFunction) => {
    try {
        const token: string =
            req.body?.token || req.query?.token || req.header('Authorization')

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token?.replace('Bearer ', ''), 'secret');

        req.user = decoded
        console.log('user:: ',decoded);
        
        // console.log('auth roles:: ',allowRoles);
        next();
    } catch (err) {
        res.status(401).send({ message: 'Unauthentication' });
    }
}


