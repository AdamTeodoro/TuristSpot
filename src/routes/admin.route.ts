
import { Router } from "express";

import multer from "multer";

import multerConfig from "../config/multerConfig";

import { AdminInactivateUserController } from "../controllers/AdminInactiveUserController";
import { AdminRatingDeletionController } from "../controllers/AdminRatingDeletionController";
import { AdminRegisterController } from "../controllers/AdminRegisterController";
import { CreateTuristSpotController } from "../controllers/CreateTuristSpotController";
import { CreateTuristSpotPicturesController } from "../controllers/CreateTuristSpotPictureController";
import { DeleteTuristSpotPicturesController } from "../controllers/DeleteTuristSpotPicturesController";
import { InactiveTuristSpotController } from "../controllers/InactiveTuristSpotController";
import { CreationPermissionController } from "../controllers/CreationPermissionController";
import { UpdateTuristSpotController } from "../controllers/UpdateTuristSpotController";
import { UpdateUserController } from "../controllers/UpdateUserController";

import { validateAdminMiddleware } from "../middlewares/validateAdmin.middleware";
import { validateAdminInactiveUserMiddleware } from "../middlewares/validateAdminInactiveUser.middleware";
import { validateAdminPermissionMiddleware } from "../middlewares/validateAdminPermission.middlware";
import { validateAdminRatingDeletionMiddleware } from "../middlewares/validateAdminRatingDeletion.middleware";
import { validateAuthMiddleware } from "../middlewares/validateAuth.middleware";
import { validatePermissionCreationMiddleware } from "../middlewares/validatePermissionCreation.middleware";
import { validateTuristSpotCreationMiddleware } from "../middlewares/validateTuristSpotCreation.middleware";
import { validateTuristSpotInactivationMiddleware } from "../middlewares/validateTuristSpotInactivation.middleware";
import { validateTuristSpotPictureMiddleware } from "../middlewares/validateTuristSpotPicture.middleware";
import { validateTuristSpotPictureCreationMiddleware } from "../middlewares/validateTuristSpotPictureCreation.middleware";
import { validateTuristSpotPictureDeletionMiddleware } from "../middlewares/validateTuristSpotPictureDeletion.middleware";
import { validateTuristSpotUpdationMiddleware } from "../middlewares/validateTuristSpotUpdation.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";
import { validateUserUpdationMiddleware } from "../middlewares/validateUserUpdation.middlware";

const adminRoute = Router();

adminRoute.post(
    '/admin/permission/create',
    validatePermissionCreationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    CreationPermissionController
);

adminRoute.post(
    '/admin/register',
    validateUserCreationMiddleware,
    validateEmailExistsMiddleware,
    validateAdminPermissionMiddleware,
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

adminRoute.put(
    '/admin/turistSpot/inactive',
    validateTuristSpotInactivationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    InactiveTuristSpotController
);

adminRoute.post(
    '/admin/turistSpotPicture/create',
    validateTuristSpotPictureCreationMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    validateTuristSpotPictureMiddleware,
    multer(multerConfig).single('image'),
    CreateTuristSpotPicturesController
);

adminRoute.delete(
    '/admin/turistSpotPicture/delete',
    validateTuristSpotPictureDeletionMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    DeleteTuristSpotPicturesController
);

adminRoute.delete(
    '/admin/rating/delete',
    validateAdminRatingDeletionMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    AdminRatingDeletionController
);

adminRoute.put(
    '/admin/simpleuser/inactive',
    validateAdminInactiveUserMiddleware,
    validateAuthMiddleware,
    validateAdminMiddleware,
    AdminInactivateUserController,
);

export { adminRoute };
