import { NextFunction, Response } from "express";

import { RatingCreationSchema } from "../schemas/requests/RatingCreation.schema";

type Request = {
    query: {
        idTuristSpot: number
    },
    body: {
        rating: {
            commentary: string,
            rating: number,
        }
    }
}

export const validateRatingCreationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (RatingCreationSchema.validate(req).error) {
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
