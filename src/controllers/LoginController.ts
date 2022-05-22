import { Response } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IKey } from "../interfaces/IKey";

import { keyService } from "../services/KeyService";
import { userService } from "../services/UserService";
import { environmentService } from "../services/EnvironmentService";
import { simpleUserService } from "../services/SimpleUserService";
import { adminService } from "../services/AdminService";

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
        const foundUser = await userService.getByEmail(email);
        //if user not found reject request access
        if (!foundUser) {
            res.status(400)
            .json({ code: 'invalid-credencials' })
            .end();
            return;
        }
        console.log(foundUser);
        const admin = await adminService.getById(foundUser.id);
        console.log(admin);
        if (!admin) {
            //verify if user is active
            const simpleUser = await simpleUserService.getIfActiveById(foundUser.id);
            if (!simpleUser) {
                res.status(401)
                .json({ code: 'inactive-user' })
                .end();
                return;
            }
        }
        //get user founded key
        const key = await keyService.getById(foundUser.id) as IKey;
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
        const authorization = jwt.sign({ id: foundUser.id }, JWT_SECRET, {
            expiresIn: _2days
        });
        //send user and authorization token
        res.status(200)
        .json({
            code: 'success-to-login',
            user: {
                id: foundUser.id,
                userName: foundUser.userName,
                fullname: foundUser.fullName,
                email: foundUser.email,
                createdAt: foundUser.createdAt,
                updatedAt: foundUser.updatedAt         
            },
            authorization
        })
        .end();
        return;
    } catch {
        res.status(500)
        .json({ code:'unknow-error' })
        .end();
        return;
    }
}
