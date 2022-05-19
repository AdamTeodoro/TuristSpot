
import { Response, NextFunction } from "express";

import { IAdmin } from "../interfaces/IAdmin";
import { adminService } from "../services/AdminService";

type Request = {
    idUser: number,
}

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const admin = await adminService.getById(req.idUser) as IAdmin;
    if (admin) {
        next();
        return;
    } else {
        res.status(403)
        .json({ code: 'invalid-authorization' })
        .end();
        return;
    }
}
