
import { Response, NextFunction } from "express";

import { ISimpleUser } from "../interfaces/ISimpleUser";

import { simpleUserService } from "../services/SimpleUserService";

type Request = {
    headers: {
        authorization?: string,
    },
    idUser?: number,
    isActive?: boolean,
}

export const validateInactiveUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const idUser = req.idUser as number;
    const simpleUser = await simpleUserService.getById(idUser) as ISimpleUser;
    if (simpleUser.isActive) {
        req.isActive = simpleUser.isActive;
        next();
        return;
    } else {
        res.status(400)
        .json({ code: 'inactive-user' })
        .end();
        return;
    }
}
