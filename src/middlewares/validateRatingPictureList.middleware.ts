import { NextFunction, Response } from "express";
import { RatingPictureSchema } from "../schemas/requests/RatingPictureList.schema";

type Request = {
    query: {
        idRating: number
    }
}

export const validateRatingPictureListMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (RatingPictureSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        }
        next();
        return;
    } catch {
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
