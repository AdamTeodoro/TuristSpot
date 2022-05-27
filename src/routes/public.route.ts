import { Router } from "express";

import { LoginController } from "../controllers/LoginController";
import { TuristSpotListController } from "../controllers/TuristSpotListController";

import { validateLoginMiddleware } from "../middlewares/validateLogin.middleware";
import { validateTuristSpotListMiddleware } from "../middlewares/validateTuristspot.middleware";

const publicRoute = Router();

publicRoute.post(
    '/login',
    validateLoginMiddleware,
    LoginController
);

publicRoute.get(
    '/turistspot/list',
    validateTuristSpotListMiddleware,
    TuristSpotListController
)

export { publicRoute };
