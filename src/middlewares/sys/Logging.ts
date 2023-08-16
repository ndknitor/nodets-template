import { NextFunction, Request, Response } from "express";
import { createLogger, transports, format } from 'winston';
import { v4 as uuidv4 } from 'uuid';
import DailyRotateFile from "winston-daily-rotate-file";
import { NODE_ENV } from "../../env";

export default function Logging(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    const path = req.path;
    logger.info(`
[REQUEST ${requestId}]
👤 Client IP: ${req.ip}
🕵️  User-Agent: ${req.headers['user-agent']}
🛣️  Path: ${path}
🤖 Method: ${req.method}
🔍 Query: ${Object.keys(req.query).map(key => `${key}=${req.query[key]}`).join('&')}
📝 Content-Type: ${req.headers['content-type'] || ""}
📏 Content-Length: ${req.headers['content-length'] || ""}`);
    let end = res.end;
    res.end = c => {
        const responseLog = `
[RESPONSE ${requestId}]
👤 Client IP: ${req.ip}
🔢 Status Code: ${res.statusCode}
📝 Content-Type: ${res.getHeader('content-type')}
📏 Content-Length: ${res.getHeader('content-length')}`;
        if (res.statusCode < 400) {
            logger.info(responseLog);
        }
        else if (res.statusCode < 500) {
            logger.warn(responseLog);
        }
        else {
            logger.error(responseLog);
        }
        res.end = end;
        return res.end(c);
    }
    next();
}

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        NODE_ENV === "production" ?
            new DailyRotateFile({
                filename: 'logs/log-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxSize: '20m', // Rotate the log file when it reaches 20 MB
                maxFiles: '14d', // Keep logs for the last 14 days
            })
            :
            new transports.Console(), // Log to the console
        // new transports.File({ filename: 'app.log' }) // Log to a file
    ]
});
