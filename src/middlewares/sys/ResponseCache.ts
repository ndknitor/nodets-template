import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: process.env["CACHE_TTL"] ? parseInt(process.env["CACHE_TTL"]) * 60 * 1000 : 1800000 });

export default function ResponseCache(req: Request, res: Response, next: NextFunction) {
    const cacheKey = req.originalUrl || req.url;

    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse !== undefined) {
        console.log('Cache hit for', cacheKey);
        return res.send(cachedResponse);
    }

    const originalSend = res.send;
    res.send = (body) => {
        cache.set(cacheKey, body);
        return originalSend.call(res, body);
    };

    next();
}

export function revalidate(url : string, body: any) {
    cache.set(url, body);
}