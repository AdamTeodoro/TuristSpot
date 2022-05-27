import { Router } from "express";

import { CreateRatingController } from "../controllers/CreateRatingController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { UserRegisterController } from "../controllers/UserRegisterController";

import { validateInactiveUserMiddleware } from "../middlewares/validateActiveUser.middleware";
import { validateAuthMiddleware } from "../middlewares/validateAuth.middleware";
import { validateRatingCreationMiddleware } from "../middlewares/validateRatingCreation.middleware";
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
    validateInactiveUserMiddleware,
    UpdateUserController
);

userRoute.post(
    '/user/rating/create',
    validateRatingCreationMiddleware,
    validateAuthMiddleware,
    validateInactiveUserMiddleware,
    CreateRatingController,
);

export { userRoute };
