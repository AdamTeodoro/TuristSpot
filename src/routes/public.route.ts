import { Router } from "express";

import { LoginController } from "../controllers/LoginController";
import { UserRegisterController } from "../controllers/UserRegisterController";

import { validateLoginMiddleware } from "../middlewares/validateLogin.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";

const publicRoute = Router();

publicRoute.post(
    '/register',
    validateUserCreationMiddleware,
    validateEmailExistsMiddleware,
    UserRegisterController
);

publicRoute.post(
    '/login',
    validateLoginMiddleware,
    LoginController
)

export { publicRoute };
