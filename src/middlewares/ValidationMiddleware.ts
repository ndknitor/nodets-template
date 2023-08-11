import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";

export default function ValidationMiddleware<T extends object>(entityClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const requestBody = req.body;
        const entity = new entityClass();

        Object.assign(entity, requestBody);

        const validationErrors = await validate(entity);

        if (validationErrors.length === 0) {
            // Validation passed, continue to the next middleware
            next();
        } else {
            // Validation failed, construct an object with field-level error messages
            const fieldErrors: { [key: string]: string[] } = {};

            validationErrors.forEach(error => {
                const property = error.property;
                const constraints = error.constraints;

                if (!fieldErrors[property]) {
                    fieldErrors[property] = [];
                }

                for (const key in constraints) {
                    fieldErrors[property].push(constraints[key]);
                }
            });

            res.status(400).json(fieldErrors);
        }
    };
}