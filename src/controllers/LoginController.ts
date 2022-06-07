import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IKey } from "../interfaces/IKey";

import { keyService } from "../services/KeyService";
import { userService } from "../services/UserService";
import { environmentService } from "../services/EnvironmentService";
import { simpleUserService } from "../services/SimpleUserService";
import { adminService } from "../services/AdminService";
import { IUser } from "../interfaces/IUser";

type Request = {
    body: {
        email: string,
        password: string,
    }
}

export const LoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //get user by email
        const refKey = await keyService.findOne({
            where: {
                email
            }
        });
        //if user not found reject request access
        if (!refKey) {
            res.status(400)
            .json({ code: 'invalid-credencials' })
            .end();
            return;
        }
        //get user
        const refUser = await userService.findByPk(refKey.id) as IUser;
        //verify if user is admin
        const refAdmin = await adminService.findByPk(refUser.id);
        //if is not admin, verify if user is actived
        if (!refAdmin) {
            //verify if user is active
            const simpleUser = await simpleUserService.findOne({
                where: {
                    id: refUser.id,
                    isActive: true
                }
            });
            if (!simpleUser) {
                res.status(401)
                .json({ code: 'inactived-user' })
                .end();
                return;
            }
        }
        //get user founded key
        const key = await keyService.findByPk(refUser.id) as IKey;
        //verify if user password is valid
        const isValidPassword = await bcrypt.compare(password, key.passwordHash);
        if (!isValidPassword) {
            res.status(400)
            .json({ code: 'invalid-credencials' })
            .end();
            return;
        }
        //generate authorization token
        const _2days =  86400 * 2;
        const { JWT_SECRET } = environmentService.getEnvironmnet();
        const authorization = jwt.sign({ id: refUser.id }, JWT_SECRET, {
            expiresIn: _2days
        });
        //send user and authorization token
        res.status(200)
        .json({
            code: 'success-to-login',
            user: {
                id: refUser.id,
                userName: refUser.userName,
                fullname: refUser.fullName,
                email: refKey.email,
                createdAt: refUser.createdAt,
                updatedAt: refUser.updatedAt         
            },
            authorization
        })
        .end();
        return;
    } catch(error) {
        console.log("Login Controller Error: ", error);
        res.status(500)
        .json({ code:'unknow-error' })
        .end();
        return;
    }
}
