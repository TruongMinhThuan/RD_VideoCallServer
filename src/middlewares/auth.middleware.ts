import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string =
            req.body?.token || req.query?.token || req.header('Authorization')


        console.log('====================================');
        console.log('token:: ', token);
        console.log('====================================');

        // if (!token) {
        //     throw new Error();
        // }

        const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret');
        console.log('====================================');
        console.log('user:: ', decoded);
        console.log('====================================');
        next();
    } catch (err) {
        console.log('====================================');
        console.log('error: ', err);
        console.log('====================================');
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
        console.log('====================================');
        console.log('user:: ', decoded);
        req.user = decoded
        // console.log('auth roles:: ',allowRoles);
        console.log('====================================');
        next();
    } catch (err) {
        console.log('====================================');
        console.log('error: ', err);
        console.log('====================================');
        res.sendStatus(401).send('ds');
    }
}


