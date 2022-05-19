import { NextFunction, Response } from "express";

import jwt from 'jsonwebtoken';

import { environmentService } from "../services/EnvironmentService";
import { simpleUserService } from "../services/SimpleUserService";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
};

type Request = {
    headers: {
        authorization: string,
    },
    idUser: number
};

export const validateAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
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
            //validate if user is inactived
            const simpleUser = await simpleUserService.getIfActiveById(Number(id));
            if (simpleUser) {
                //get idUser
                req.idUser = Number(id);
                next();
                return;
            } else {
                res.status(401)
                .json({ code: 'user-inactived-by-admin' })
                .end();
                return;
            }
        });
    } catch {
        res.status(400)
        .json({ code: 'invalid-authorization' })
        .end();
        return;
    }
}
