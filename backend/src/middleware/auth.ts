import { NextFunction, Request, Response } from 'express';
import { cookie } from 'express-validator';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
   namespace Express {
       interface Request {
        userId: string;
       }
   } 
}
export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const token  = req.cookies['auth_token'];
    console.log("token", JSON.stringify(req.cookies))
    if(!token) {
        return res.status(401).send({ message: 'unauthorized'})
    }
    try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
     req.userId = (decoded as JwtPayload).userID;
     next();   
    } catch (error) {
        return res.status(401).send({ message: 'unauthorized'})
    }
}


