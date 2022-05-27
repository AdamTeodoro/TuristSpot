import { NextFunction, Response } from "express";
import { AdminInactivationSchema } from "../schemas/requests/AdminInactivationUserSchema";
import { simpleUserService } from "../services/SimpleUserService";

type Request = {
    headers:{
        authorization?: string;
    },
    query: {
        idSimpleUser?: number;
    }
}

export const validateAdminInactiveUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (AdminInactivationSchema.validate(req).error) {
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
