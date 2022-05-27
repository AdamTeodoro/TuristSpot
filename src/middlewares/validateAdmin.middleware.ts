
import { Response, NextFunction } from "express";

import { adminService } from "../services/AdminService";

type Request = {
    headers: {
        authorization?: string,
    },
    idUser?: number,
}

export const validateAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idUser = req.idUser as number;
        const refAdmin = await adminService.findByPk(idUser);
        if (refAdmin) {
            next();
            return;
        } else {
            res.status(403)
            .json({ code: 'invalid-authorization' })
            .end();
            return;
        }
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
    }
}
