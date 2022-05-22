

import { Response } from "express";
import bcrypt from 'bcrypt';

import { IKey } from "../interfaces/IKey";

import { keyService } from "../services/KeyService";
import { UserData, userService } from "../services/UserService";

type Request = {
    body: {
        user: UserData,
        pass: {
            newPassword?: string,
            oldPassword: string
        }
    }
    idUser?: number,
    isActive?: boolean,
}

export async function UpdateUserController(req: Request, res: Response) {
    try {
        const { user, pass } = req.body
        const idUser = req.idUser as number;
        //get user founded key
        const key = await keyService.getById(idUser) as IKey;
        //verify if user password is valid
        const isValidPassword = await bcrypt.compare(pass.oldPassword, key.passwordHash);
        if (!isValidPassword) {
            res.status(400)
            .json({ code: 'invalid-credencials' })
            .end();
            return;
        }
        //update user
        const updatedUser = await userService.update(idUser, user);
        const isUpdatingEmail = key.email !== user.email;
        //verify if user are updating email or password
        if (
            isUpdatingEmail ||
            pass.newPassword
        ) {
            //update email and passoword if user ar updating password
            await keyService.update(
                idUser, 
                {
                    id: idUser,
                    email: updatedUser.email,
                    passwordHash: pass.newPassword? pass.newPassword: pass.oldPassword
                }
            )
        }
        //send user created
        res.status(200)
        .json({ code: 'success-to-update-user-data' })
        .end();
        return;
    } catch(error) {
        console.log(error);
        res.status(400)
        .json({ code: 'fail-to-create-user' })
        .end();
        return;
    }
}
