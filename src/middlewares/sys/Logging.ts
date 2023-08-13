import { NextFunction, Request, Response } from "express";
import { createLogger, transports, format } from 'winston';
import { v4 as uuidv4 } from 'uuid';
import DailyRotateFile from "winston-daily-rotate-file";

export default function Logging(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    logger.info(`
    📥 [REQUEST]
    🪪 Request Id: ${requestId}
    👤 Client IP: ${req.ip}
    🕵️ User-Agent: ${req.headers['user-agent']}
    🛣️ Path: ${req.path}
    🤖 Method: ${req.method}
    🔍 Query: ${Object.keys(req.query).map(key => `${key}=${req.query[key]}`).join('&')}
    💾 Request Body: ${req.body}
    📝 Content-Type: ${req.headers['content-type']}
    📏 Content-Length: ${req.headers['content-length']}`);
    next();
    const responseLog = `
    📤 [RESPONSE]
    🪪 Request Id: ${requestId}
    👤 Client IP: ${req.ip}
    🛣️ Path: ${req.path}
    🤖 Method: ${req.method}
    🔢 Status Code: ${res.statusCode}`;
    if (res.statusCode < 400) {
        logger.info(responseLog);
    }
    else if (res.statusCode < 500) {
        logger.warning(responseLog);
    }
    else {
        logger.error(responseLog);
    }
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        // new DailyRotateFile({
        //     filename: 'logs/log-%DATE%.log',
        //     datePattern: 'YYYY-MM-DD',
        //     maxSize: '20m', // Rotate the log file when it reaches 20 MB
        //     maxFiles: '14d', // Keep logs for the last 14 days
        // })
        new transports.Console(), // Log to the console
        // new transports.File({ filename: 'app.log' }) // Log to a file
    ]
});
