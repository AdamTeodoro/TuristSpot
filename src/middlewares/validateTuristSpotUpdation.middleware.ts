import { NextFunction, Response } from "express";

import { TuristSpotUpdationSchema } from "../schemas/requests/TuristSpotUpdation.schema";

import { TuristSpotData } from "../services/TuristSpotService";

type Request = {
    query: {
        idTuristSpot: number,
    },
    body: {
        turistSpot: Partial<TuristSpotData>
    },
    idUser?: number,
};

export const validateTuristSpotUpdationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (TuristSpotUpdationSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        }
        next();
        return;
    } catch(error) {
        res.status(500)
            .json({ code: 'internal-server-error' })
            .end();
        return;
    }
}
