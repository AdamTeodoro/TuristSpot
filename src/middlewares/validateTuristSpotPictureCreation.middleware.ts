import { NextFunction, Response, Request } from "express";

import { TuristSpotPictureCreationSchema } from "../schemas/requests/TuristSpotPictureCreation.schema";

export const validateTuristSpotPictureCreationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (TuristSpotPictureCreationSchema.validate(req).error) {
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
