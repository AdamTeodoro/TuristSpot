import { NextFunction, Response } from "express";

import { RatingCreationSchema } from "../schemas/requests/RatingCreation.schema";

import { turistSpotService } from "../services/TuristSpotService";

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
        }
        const { idTuristSpot } = req.query;
        //verify if turistspot id is valid
        const refturistSpot = await turistSpotService.getById(idTuristSpot)
        if (!refturistSpot) {
            res.status(400)
            .json({ code: 'invalid-turistspot-id' })
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
