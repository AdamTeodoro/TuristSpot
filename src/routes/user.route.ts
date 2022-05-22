import { Router } from "express";

import { UpdateUserController } from "../controllers/UpdateUserController";
import { UserRegisterController } from "../controllers/UserRegisterController";

import { validateInactiveUser } from "../middlewares/validateActiveUser.middleware";
import { validateAuthMiddleware } from "../middlewares/validateAuth.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";
import { validateUserUpdationMiddleware } from "../middlewares/validateUserUpdation.middlware";

const userRoute = Router();

userRoute.post(
    '/user/register',
    validateUserCreationMiddleware,
    validateEmailExistsMiddleware,
    UserRegisterController
);

userRoute.put(
    '/user/update',
    validateUserUpdationMiddleware,
    validateAuthMiddleware,
    validateInactiveUser,
    UpdateUserController
)

userRoute.post(
    '/user/rating/create',
    
)

export { userRoute };
