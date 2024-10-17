import { NextFunction, Response } from "express";

import { UserUpdationSchema } from "../schemas/requests/UserUpdation.schema";

import { UserData } from "../services/UserService";

type Request = {
    headers: {
        authorization?: string,
    },
    body: {
        user: UserData,
        pass: {
            newPassword?: string,
            oldPassword: string
        }
    },
};

export const validateUserUpdationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (UserUpdationSchema.validate(req).error) {
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
