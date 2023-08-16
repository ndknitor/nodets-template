import { Response } from "express";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { logger } from "../../middlewares/sys/Logging";

export default async function handleRequest(res: Response, handler: () => void | Promise<void>) {
    try {
        await handler();
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ message: "Internal Server Error" });
        logger.error(error);
    }
}
export function formatNumber(num: number | undefined) {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }
    return "";
}

export function getMaxPage(limit: number, total: number) {
    return Math.ceil(total / limit);
}

export function range(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateString(str: string | undefined, wordCount: number): string {
    if (str) {
        const words = str.split(" ");
        if (words.length <= wordCount) {
            return str;
        } else {
            return words.slice(0, wordCount).join(" ") + "...";
        }
    }
    return "";
}

export function randomInt(min: number, max: number): number {
    // Ensure the minimum and maximum values are integers
    min = Math.floor(min);
    max = Math.floor(max);

    // Generate a random number between 0 and (max - min)
    const randomNumber = Math.floor(Math.random() * (max - min + 1));

    // Return the random number plus the minimum value
    return randomNumber + min;
}
