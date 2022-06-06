import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/multerConfig";

import { CreateRatingController } from "../controllers/CreateRatingController";
import { CreateRatingPictureController } from "../controllers/CreateRatingPictureController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { RegisterUserController } from "../controllers/RegisterUserController";

import { validateInactiveUserMiddleware } from "../middlewares/validateActiveUser.middleware";
import { validateAuthMiddleware } from "../middlewares/validateAuth.middleware";
import { validateRatingCreationMiddleware } from "../middlewares/validateRatingCreation.middleware";
import { validateRatingPicture } from "../middlewares/validateRatingPicture.middleware";
import { validateRatingPictureCreationMiddleware } from "../middlewares/validateRatingPictureCreation.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";
import { validateUserUpdationMiddleware } from "../middlewares/validateUserUpdation.middlware";

const userRoute = Router();

userRoute.post(
    '/user/register',
    validateUserCreationMiddleware,
    validateEmailExistsMiddleware,
    RegisterUserController
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

userRoute.post(
    'user/ratingPicture/create',
    validateRatingPictureCreationMiddleware,
    validateAuthMiddleware,
    validateInactiveUserMiddleware,
    validateRatingPicture,
    multer(multerConfig).single('image'),
    CreateRatingPictureController,
);

userRoute.delete(
    'user/ratingPicture/delete',
    validateRatingPictureCreationMiddleware,
    validateAuthMiddleware,
    validateInactiveUserMiddleware,
    validateRatingPicture,
    multer(multerConfig).single('image'),
    CreateRatingPictureController,
);

export { userRoute };
