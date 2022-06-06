import { Router } from "express";

import { LoginController } from "../controllers/LoginController";
import { FindTuristSpotController } from "../controllers/FindTuristSpotController";
import { TuristSpotListController } from "../controllers/TuristSpotListController";

import { validateLoginMiddleware } from "../middlewares/validateLogin.middleware";
import { validateTuristSpotListMiddleware } from "../middlewares/validateTuristspot.middleware";
import { validateTuristSpotFindMiddleware } from "../middlewares/validateTuristSpotFind.middleware";

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
);

publicRoute.get(
    '/turistspot/list',
    validateTuristSpotListMiddleware,
    TuristSpotListController
);

publicRoute.get(
    '/turistspot/find',
    validateTuristSpotFindMiddleware,
    FindTuristSpotController,
);

export { publicRoute };
