import { Response } from "express";

import { IUser } from "../interfaces/IUser";

import { adminService } from "../services/AdminService";
import { keyService } from "../services/KeyService";
import { UserData, userService } from "../services/UserService";

type Request = {
    query: {
        authorization?: string;
        idPermission: number;
    },
    body: {
        user: UserData
        password: string
    }
};

export async function AdminRegisterController(req: Request, res: Response) {
    try {
        const { password, user } = req.body;
        //create User
        const userCreated: IUser = await userService.create(user);
        await adminService.create({ id: userCreated.id });
        //create User Key
        await keyService.create({
            id: userCreated.id,
            email: userCreated.email,
            passwordHash: password
        });
        //send response with Admin created
        res.status(200)
        .json({ code: 'success-to-create-admin', userCreated })
        .end();
        return;
    } catch {
        res.status(400)
        .json({ code: 'fail-to-create-admin' })
        .end();
        return;
    }
}
