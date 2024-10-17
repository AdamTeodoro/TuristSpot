import { NextFunction, Response } from "express";

import { AdminCreationSchema } from "../schemas/requests/AdminCreation.schema";

import { UserData } from "../services/UserService";

type Request = {
    body: {
        user: UserData,
        password: string
    }
}

export const validateUserCreationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (AdminCreationSchema.validate(req).error) {
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
