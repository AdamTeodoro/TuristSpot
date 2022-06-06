import { NextFunction, Response } from "express";

import { simpleUserService } from "../services/SimpleUserService";

type Request = {
    headers: {
        authorization?: string;
    }
    query: {
        idSimpleUser?: number;
    },
};

export const AdminInactivateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idSimpleUser = req.query.idSimpleUser as number;
        //verify if simpleUser exists
        const refSimpleUser = await simpleUserService.findByPk(idSimpleUser);
        if (refSimpleUser) {
            //update simple user status
            await refSimpleUser.update({ isActive: false });
        } else {
            res.status(401)
            .json({ code: 'fail-to-inactive-user' })
            .end();
            return;
        }
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
