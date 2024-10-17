import { NextFunction, Response } from "express";

import { TuristSpotRatingGetSchema } from "../schemas/requests/TuristSpotRatingGetSchema";

type Request = {
    query: {
        idTuristSpot: number,
        lastTuristSpot?: Date,
    }
};

export const validateTuristSpotRatingGetMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotRatingGetSchema.validate(req).error) {
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
            .json({ code: 'invalid-request-data' })
            .end();
        return;
    }
}
