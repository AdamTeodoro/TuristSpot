import { NextFunction, Response } from "express";

import { UserData, userService } from "../services/UserService";

type Request = {
    query: {
        idPermission: number,
        authorization?: string,
    }
    body: {
        user: UserData,
        password: string
    }
}

export const validateEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //verify if user email exists
    const user = req.body.user;
    const foundUser = await userService.findOne({ 
        where: {
            id: user.email
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
