import { Response } from "express";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { hashService } from "../services/HashService"
import { permissionService } from "../services/PermissionService"
import { environmentService } from "../services/EnvironmentService";

type Request = {
    headers: {
        authorization?: string
    },
    idUser?: number
};

export const CreationPermissionController = async (req: Request, res: Response) => {
    try {
        //generate token
        const pass = hashService.generateHash(32);
        //generate expiration in 7 days
        const idAdmin = req.idUser as number;
        const permissionHash = await bcrypt.hash(pass, 8);
        //generate token from the new admin register
        const _7days =  86400 * 7;
        const authorization = jwt.sign({ id: idAdmin }, permissionHash, {
            expiresIn: _7days
        });
        const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        //create permission
        const permissionCreated = await permissionService.create({
            idAdmin,
            expiration,
            permissionHash,
            isActive: true
        });
        //get url from register Admin
        const { URL_DEFAULT } = environmentService.getEnvironmnet();
        const query1 = `idPermission=${permissionCreated.id}`;
        const query2 = `&authorization=${authorization}`;
        const urlToRegister = `${URL_DEFAULT}/admin/register?` + query1 + query2;
        //send url to register admin
        res.status(200)
        .json({
            code: 'success-to-generate-permission',
            permission: {
                authorization,
                idPermission: permissionCreated.id,
                isActive: true,
                expiration: permissionCreated.expiration
            },
            urlToRegister
        })
        .end();
        return;
    } catch(error) {
        console.log(error);
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}