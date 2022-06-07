

import { Response } from "express";
import bcrypt from 'bcrypt';

import { IKey } from "../interfaces/IKey";

import { keyService } from "../services/KeyService";

import { UserData, userService } from "../services/UserService";
import { IUser } from "../interfaces/IUser";

type Request = {
    body: {
        user: UserData,
        pass: {
            newPassword?: string,
            oldPassword: string
        },
        email: string
    }
    idUser?: number,
    isActive?: boolean,
}

export async function UpdateUserController(req: Request, res: Response) {
    try {
        const { user, pass, email } = req.body
        const idUser = req.idUser as number;
        //get user founded key
        const refKey = await keyService.findByPk(idUser) as IKey;
        //verify if user password is valid
        const isValidPassword = await bcrypt.compare(pass.oldPassword, refKey.passwordHash);
        if (!isValidPassword) {
            res.status(400)
            .json({ code: 'invalid-credencials' })
            .end();
            return;
        }
        //update user
        const refUser = await userService.findByPk(idUser) as IUser;
        await refUser.update(user);
        //get is Updating email
        const isUpdatingEmail = refKey.email !== email;
        //verify if user are updating email or password
        if (
            isUpdatingEmail ||
            pass.newPassword
        ) {
            //update email and passoword if user ar updating password
            await refKey.update({
                id: idUser,
                email: email,
                passwordHash: pass.newPassword? pass.newPassword: pass.oldPassword
            });
        }
        //send user created
        res.status(200)
        .json({ code: 'success-to-update-user-data' })
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
