import { NextFunction, Response } from "express";

import { LoginSchema } from "../schemas/requests/Login.schema";

type Request = {
    body: {
        email: string,
        password: string,
    }
}

export const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (LoginSchema.validate(req).error) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
            .end();
            return;
        }
    } catch {
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}