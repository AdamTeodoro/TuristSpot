
import { Response, NextFunction } from "express";

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
    const simpleUser = await simpleUserService.findByPk(idUser);
    if (simpleUser && simpleUser.isActive) {
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
