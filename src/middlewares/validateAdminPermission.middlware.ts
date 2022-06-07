import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { permissionService } from "../services/PermissionService";
import { UserData } from "../services/UserService";

type Request = {
    headers: {
        authorization?: string,
    }
    query: {
        idPermission: number,
    },
    body: {
        user: UserData,
        password: string
    }
}

export const validateAdminPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idPermission } = req.query;
        const authorization = req.headers.authorization as string;
        //get permission
        const refPermission = await permissionService.findByPk(idPermission);
        //verify with jwt if authorization is valid
        if (!refPermission) {
            res.status(400)
            .json({ code: 'invalid-permission' })
            .end();
            return;
        }
        //validate expiration time from permission
        if (Date.now() > refPermission.expiration.getTime()) {
            //update permission status
            await refPermission.update({ isActive: false });
            res.status(401)
            .json({ code: 'permission-expired' })
            .end();
            return;
        }
        //verify if authorization is valid
        jwt.verify(
            authorization,
            refPermission.permissionHash,
            async (error, decoded) => {
                if (error) {
                    res.status(400)
                    .json({ code: 'invalid-authorization'})
                    .end();
                    return;
                }
                //inactive permission if valid
                await refPermission.update({ isActive: false });
                next();
                return;
            }
        );
    } catch {
        res.status(400)
        .json({ code: 'invalid-credencials' })
        .end();
        return;
    }
}
