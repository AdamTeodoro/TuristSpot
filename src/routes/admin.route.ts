import { Router } from "express";

import multer from "multer";

import multerConfig from "../config/multerConfig";

import { AdminRegisterController } from "../controllers/AdminRegisterController";
import { CreateTuristSpotController } from "../controllers/CreateTuristSpotController";
import { CreateTuristSpotPicturesController } from "../controllers/CreateTuristSpotPicture";
import { UpdateTuristSpotController } from "../controllers/UpdateTuristSpotController";
import { UpdateUserController } from "../controllers/UpdateUserController";

import { validateAdminMiddleware } from "../middlewares/validateAdmin.middleware";
import { validateAdminPermission } from "../middlewares/validateAdminPermission.middlware";
import { validateAuthMiddleware } from "../middlewares/validateAuth.middleware";
import { validateTuristSpotCreationMiddleware } from "../middlewares/validateTuristSpotCreation.middleware";
import { validateTuristSpotPicture } from "../middlewares/validateTuristSpotPicture.middleware";
import { validateTuristSpotPictureCreationMiddleware } from "../middlewares/validateTuristSpotPictureCreation.middleware";
import { validateTuristSpotUpdationMiddleware } from "../middlewares/validateTuristSpotUpdation.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";
import { validateUserUpdationMiddleware } from "../middlewares/validateUserUpdation.middlware";

const adminRoute = Router();

adminRoute.post(
    '/admin/register',
    validateUserCreationMiddleware,
    validateEmailExistsMiddleware,
    validateAdminPermission,
    AdminRegisterController
);

adminRoute.put(
    '/admin/update',
    validateUserUpdationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    UpdateUserController
);

adminRoute.post(
    '/admin/turistSpot/create',
    validateTuristSpotCreationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    CreateTuristSpotController
);

adminRoute.put(
    '/admin/turistSpot/update',
    validateTuristSpotUpdationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    UpdateTuristSpotController
);

adminRoute.post(
    '/admin/turistSpotPicture/create',
    validateTuristSpotPictureCreationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    validateTuristSpotPicture,
    multer(multerConfig).single('image'),
    CreateTuristSpotPicturesController
);

adminRoute.post(
    '/admin/',
    
)

export { adminRoute };
