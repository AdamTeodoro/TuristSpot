import { NextFunction, Response } from "express";

import { UserData, userService } from "../services/UserService";

type Request = {
    query: {
        idPermission: number,
        authorization?: string,
    },
    body: {
        user: UserData,
        password: string
    }
};

export const validateEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //verify if user email exists
        const  { user } = req.body;
        const refUser = await userService.findOne({ 
            where: {
                email: user.email
            }
        });
        //if email exists return error
        if (refUser) {
            res.status(403)
                .json({ code: 'email-already-registered' })
                .end();
            return;
        }
        next();
        return;
    } catch(error) {
        console.log('falha ao validar e-mail', error);
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
