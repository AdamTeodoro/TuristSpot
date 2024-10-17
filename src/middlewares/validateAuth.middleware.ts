import { NextFunction,  Response } from "express";

import jwt from 'jsonwebtoken';

import { environmentService } from "../services/EnvironmentService";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
};

type Request = {
    headers: {
        authorization?: string,
    },
    idUser?: number
};

export const validateAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization as string;
        const { JWT_SECRET } = environmentService.getEnvironmnet();
        //validate user auth
        jwt.verify(authorization, JWT_SECRET, async (error, decoded) => {
            if (error) {
                res.status(400)
                    .json({ code: 'invalid-authorization' })
                    .end();
                    return;
            }
            const { id } = decoded as TokenPayload;
            //get idUser
            req.idUser = Number(id);
            next();
            return;
        });
    } catch {
        res.status(400)
        .json({ code: 'invalid-authorization' })
        .end();
        return;
    }
}
