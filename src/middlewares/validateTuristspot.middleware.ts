import { NextFunction, Response } from "express";

import { TuristSpotListSchema } from "../schemas/requests/TuristSpotList.schema";

type Request = {
    query: {
        lastTuristSpot?: number
    }
};

export const validateTuristSpotListMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotListSchema.validate(req).error) {
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
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
};
