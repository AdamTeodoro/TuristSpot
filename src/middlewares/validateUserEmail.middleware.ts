import { NextFunction, Response } from "express";

import { UserData, userService } from "../services/UserService";

type Request = {
    query: {
        idPermission: number,
        authorization?: string,
    },
    body: {
        user: UserData,
        email: string,
        password: string
    }
}

export const validateEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //verify if user email exists
    const email = req.body.email;
    const foundUser = await userService.findOne({ 
        where: {
            id: email
        }
    });
    if (foundUser) {
        res.status(403)
        .json({ code: 'email-already-registered' })
        .end();
        return;
    } else {
        next();
    }
}
