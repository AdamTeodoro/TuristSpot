import { NextFunction, Response } from "express";

import { PermissionCreationSchema } from "../schemas/requests/PermissionCreation.schema";

type Request = {
    headers: {
        authorization?: string
    }
}

export const validatePermissionCreationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(PermissionCreationSchema.validate(req).error);
        if (PermissionCreationSchema.validate(req).error) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
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
