import { NextFunction, Response } from "express";
import { TuristSpostListSchema } from "../schemas/requests/TuristSpostList.schema";


type Request = {
    query: {
        lastTuristSpot?: Date
    };
}

export const validateTuristSpotListMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpostListSchema.validate(req).error) {
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
