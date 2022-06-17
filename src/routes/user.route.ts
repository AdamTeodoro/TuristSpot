import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/multerConfig";

import { CreateRatingController } from "../controllers/CreateRatingController";
import { CreateRatingPictureController } from "../controllers/CreateRatingPictureController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { RegisterUserController } from "../controllers/RegisterUserController";
import { UpdateRatingController } from "../controllers/UpdateRatingController";
import { DeleteRatingPictureController } from "../controllers/DeleteRatingPictureController";

import { validateActiveUserMiddleware } from "../middlewares/validateActiveUser.middleware";
import { validateAuthMiddleware } from "../middlewares/validateAuth.middleware";
import { validateRatingCreationMiddleware } from "../middlewares/validateRatingCreation.middleware";
import { validateRatingPicture } from "../middlewares/validateRatingPicture.middleware";
import { validateRatingPictureCreationMiddleware } from "../middlewares/validateRatingPictureCreation.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";
import { validateUserUpdationMiddleware } from "../middlewares/validateUserUpdation.middlware";
import { validateRatingPictureDeletionMiddleware } from "../middlewares/validateRatingPictureDeletion.middleware";

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
    validateActiveUserMiddleware,
    UpdateUserController
);

userRoute.post(
    '/user/rating/create',
    validateRatingCreationMiddleware,
    validateAuthMiddleware,
    validateActiveUserMiddleware,
    CreateRatingController,
);

userRoute.put(
    '/user/rating/update',
    validateRatingCreationMiddleware,
    validateAuthMiddleware,
    validateActiveUserMiddleware,
    UpdateRatingController
);

userRoute.post(
    '/user/ratingPicture/create',
    validateRatingPictureCreationMiddleware,
    validateAuthMiddleware,
    validateActiveUserMiddleware,
    validateRatingPicture,
    multer(multerConfig).single('image'),
    CreateRatingPictureController,
);

userRoute.delete(
    '/user/ratingPicture/delete',
    validateRatingPictureDeletionMiddleware,
    validateAuthMiddleware,
    validateActiveUserMiddleware,
    DeleteRatingPictureController,
);

export { userRoute };
