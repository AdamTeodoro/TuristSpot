import { NextFunction, Response } from "express";

import { RatingCreationSchema } from "../schemas/requests/RatingCreation.schema";

type Request = {
    headers: {
        authorization?: string
    },
    query: {
        idTuristSpot: number
    },
    body: {
        rating: {
            commentary: string,
            rating: number,
        }
    }
};

export const validateRatingCreationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (RatingCreationSchema.validate(req).error) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
            .end();
            return;
        }
        next();
        return;
    } catch {
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}
