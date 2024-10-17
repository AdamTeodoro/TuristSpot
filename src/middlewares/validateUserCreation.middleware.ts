import { NextFunction, Response } from "express";


import { UserCreationSchema } from "../schemas/requests/UserCreation.schema";

import { UserData } from "../services/UserService";

type Request = {
    body: {
        user: UserData,
        password: string
    }
}

export const validateUserCreationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (UserCreationSchema.validate(req).error) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        }
        next();
        return;
    } catch (error) {
        res.status(500)
            .json({ code: 'internal-server-error' })
            .end();
        return;
    }
}
