import { NextFunction, Response } from "express";

import { RatingPictureDeletionSchema } from "../schemas/requests/RatingPictureDeletion.schema";

type Request = {
    headers: {
        authorization?: string,
    },
    query: {
        idPicture?: number
    }
};

export const validateRatingPictureDeletionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (RatingPictureDeletionSchema.validate(req).error) {
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
}
