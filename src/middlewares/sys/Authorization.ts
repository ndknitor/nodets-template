import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../../libs/enums/HttpStatusCode';
import { Payload } from '../../libs/authorization';

export default function Authorization(roles?: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization');        
        if (!token) {
            return res.status(HttpStatusCode.Unauthorized).json({ error: 'No token provided' });
        }
        jwt.verify(token.split(" ")[1], process.env["JWT_SECRET"] as string, (err, decoded: Payload) => {            
            if (err) {
                return res.status(HttpStatusCode.BadRequest).json({ error: 'Invalid token' });
            }
            if (!roles) {
                return next();
            }
            if (roles.indexOf(decoded.role) == -1) {
                return res.status(HttpStatusCode.Forbidden).json({error: 'User are forbidded'});
            }
            return next();
        });
    };
}