import { NextFunction, Response } from "express";

import { RatingPictureCreationSchema } from "../schemas/requests/RatingPictureCreation.schema";

type Request = {
    headers: {
        authorization?: string
    },
    query: {
        idRating?: string
    },
    idUser?: number,
    imgTable?: string,
};

export const validateRatingPictureCreationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (RatingPictureCreationSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        } else {
            req.imgTable = "ratingpictures";
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
