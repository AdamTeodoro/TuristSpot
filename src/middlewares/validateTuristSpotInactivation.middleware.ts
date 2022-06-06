import { NextFunction, Response, Request } from "express";

import { TuristSpotInactivationSchema } from "../schemas/requests/TuristSpotInactivation.schema";

export const validateTuristSpotInactivationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotInactivationSchema.validate(req).error) {
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
