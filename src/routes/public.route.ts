import { Router } from "express";

import { LoginController } from "../controllers/LoginController";
import { FindTuristSpotController } from "../controllers/FindTuristSpotController";
import { ListTuristSpotController } from "../controllers/ListTuristSpotController";
import { ListRatingByTuristSpotController } from "../controllers/ListRatingByTuristSpotController";

import { validateLoginMiddleware } from "../middlewares/validateLogin.middleware";
import { validateTuristSpotListMiddleware } from "../middlewares/validateTuristspot.middleware";
import { validateTuristSpotFindMiddleware } from "../middlewares/validateTuristSpotFind.middleware";
import { validateTuristSpotRatingGetMiddleware } from "../middlewares/validateTuristSpotRatingGet.middleware";
import { ListTuristSpotPictureController } from "../controllers/ListTuristSpotPictureController";
import { validateturistSpotPictureListMiddleware } from "../middlewares/validateturistSpotPictureList.middleware";
import { validateRatingPictureListMiddleware } from "../middlewares/validateRatingPictureList.middleware";
import { ListRatingPictureController } from "../controllers/ListRatingPictureController";

const publicRoute = Router();

publicRoute.post(
    '/login',
    validateLoginMiddleware,
    LoginController
);

publicRoute.get(
    '/turistspot/list',
    validateTuristSpotListMiddleware,
    ListTuristSpotController
);

publicRoute.get(
    '/rating/listByTuristSpot',
    validateTuristSpotRatingGetMiddleware,
    ListRatingByTuristSpotController,
);

publicRoute.get(
    '/turistspot/find',
    validateTuristSpotFindMiddleware,
    FindTuristSpotController,
);

publicRoute.get(
    '/turistspotPicture/list',
    validateturistSpotPictureListMiddleware,
    ListTuristSpotPictureController
);

publicRoute.get(
    '/ratingPicture/list',
    validateRatingPictureListMiddleware,
    ListRatingPictureController
)

export { publicRoute };
