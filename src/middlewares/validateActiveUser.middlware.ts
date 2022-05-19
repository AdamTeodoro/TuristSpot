
import { Response, NextFunction } from "express";

import { ISimpleUser } from "../interfaces/ISimpleUser";

import { simpleUserService } from "../services/SimpleUserService";

type Request = {
    headers: any
    body: any,
    query: any,
    idUser: number,
    isActive: boolean,
}

export const validateInactiveUser = async (req: Request, res: Response, next: NextFunction) => {
    const simpleUser = await simpleUserService.getById(req.idUser) as ISimpleUser;
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
