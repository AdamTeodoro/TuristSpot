import { NextFunction, Response, Request } from "express";

import { TuristSpotCreationSchema } from "../schemas/requests/TuristSpotCreation.schema";

export const validateTuristSpotCreationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotCreationSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        } else {
            next();
            return;
        }
    } catch {
        res.status(500)
            .json({ code: 'internal-server-error' })
            .end();
        return;
    }
}
