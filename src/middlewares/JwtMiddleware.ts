import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  // Add more properties to the DecodedToken interface if needed
}

export const JwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env["JWT_SECRET"] as string, (err, decoded: DecodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Add the decoded token to the request for future use
    req["userId"] = decoded.userId;
    // Call the next middleware or route handler
    next();
  });
};
