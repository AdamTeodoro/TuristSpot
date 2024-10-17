import { NextFunction, Response } from "express";
import { AdminRatingDeletionSchema } from "../schemas/requests/AdminRatingDeletion.schema";

type Request = {
    headers: {
        authorization?: string
    },
    query: {
        idRating?: number
    }
}

export const validateAdminRatingDeletionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (AdminRatingDeletionSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end()
            return;
        }
        next()
        return;
    } catch(error) {
        res.status(500)
        .json({ code: "unknow-error" })
        .end();
        return;
    }
}
