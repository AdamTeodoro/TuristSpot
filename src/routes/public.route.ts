import { Router } from "express";

import { LoginController } from "../controllers/LoginController";

import { validateLoginMiddleware } from "../middlewares/validateLogin.middleware";

const publicRoute = Router();

publicRoute.post(
    '/login',
    validateLoginMiddleware,
    LoginController
);

export { publicRoute };
