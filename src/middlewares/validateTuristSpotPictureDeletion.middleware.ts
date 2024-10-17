import { NextFunction, Response, Request } from "express";

import { TuristSpotPictureDeletionSchema } from "../schemas/requests/TuristSpotPictureDeletion.schema";

export const validateTuristSpotPictureDeletionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotPictureDeletionSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        } else {
            next();
            return;
        }
    } catch(error) {
        res.status(500)
            .json({ code: 'internal-server-error' })
            .end();
        return;
    }
}
