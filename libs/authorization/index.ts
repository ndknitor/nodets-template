import { Request } from "express";
import jwt from 'jsonwebtoken';

export interface Payload {
    role: string;
}
export function getPayload(request: Request) {
    const token = request.header('Authorization').split(" ")[1];
    let payload : Payload; 
    jwt.verify(token, process.env["JWT_SECRET"] as string, (err, decoded: Payload) => {
        payload = decoded;
    });
    return payload;
}