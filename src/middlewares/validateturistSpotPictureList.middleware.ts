
import { NextFunction, Response } from "express";
import { TuristSpotPictureListSchema } from "../schemas/requests/TuristSpotPictureList.schema";


type Request = {
    query: {
        idTuristSpot: number
    }
};

export const validateturistSpotPictureListMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotPictureListSchema.validate(req).error) {
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
