import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

interface CachedResponse {
    body: any;
    contentType: string | undefined;
}

const cache = new NodeCache(); //NodeCache({ stdTTL: process.env["CACHE_TTL"] ? parseInt(process.env["CACHE_TTL"]) * 60 * 1000 : 1800000 });

export default function ResponseCache(ttlMinutes?: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const cacheKey = req.originalUrl || req.url;

        if (!cacheKey) {
            return next();
        }

        const cachedResponse = cache.get<CachedResponse>(cacheKey);

        // Check if the response is already cached
        if (cachedResponse !== undefined) {
            console.log('Cache hit for', cacheKey);
            // Set the Content-Type header before sending cached response
            if (cachedResponse.contentType) {
                res.setHeader('Content-Type', cachedResponse.contentType);
            }
            return res.send(cachedResponse.body);
        }

        // Override the res.send method to cache the response along with content type
        const originalSend = res.send.bind(res);
        res.send = (body) => {
            // Cache the response body and content type
            const contentType = res.getHeader('Content-Type') as string | undefined;
            cache.set(cacheKey, { body, contentType }, ttlMinutes * 60); // TTL in seconds

            return originalSend(body);
        };
        return next();
    };
}


// export default function ResponseCache(req: Request, res: Response, next: NextFunction) {
//     const cacheKey = req.originalUrl || req.url;
//     const cachedResponse = cache.get<CachedResponse>(cacheKey);

//     if (cachedResponse !== undefined) {
//         console.log('Cache hit for', cacheKey);
//         if (cachedResponse.contentType) {
//             res.setHeader('Content-Type', cachedResponse.contentType);
//         }
//         return res.send(cachedResponse.body);
//     }

//     const originalSend = res.send.bind(res);
//     res.send = (body) => {
//         const contentType = res.getHeader('Content-Type') as string | undefined;
//         cache.set(cacheKey, { body, contentType },); // TTL in seconds

//         return originalSend(body);
//     };

//     next();
// }

// export function revalidate(url: string, body: any) {
//     cache.set(url, body);
// }