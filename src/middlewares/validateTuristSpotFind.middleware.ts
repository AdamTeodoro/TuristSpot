import { NextFunction, Response } from "express";
import { TuristSpotFindSchema } from "../schemas/requests/TuristSpotFind.schema";

type Request = {
    query: {
        
    }
};

export const validateTuristSpotFindMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotFindSchema.validate(req).error) {
            res.status(400)
            .json({ code: 'invalid-request-date' })
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
