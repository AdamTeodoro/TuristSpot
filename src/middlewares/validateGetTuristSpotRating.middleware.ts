import { NextFunction, Response } from "express";
import { GetTuristSpotRatingSchema } from "../schemas/requests/GetTuristSpotRatingSchema";

type Request = {
    query: {
        idTuristSpot: number;
        lastTuristSpot?: Date
    }
};

export const validateGetTuristSpotRatingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (GetTuristSpotRatingSchema.validate(req).error) {
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
