import { Router } from "express";

import { AdminRegisterController } from "../controllers/AdminRegisterController";

import { validateAdminPermission } from "../middlewares/validateAdminPermission.middlware";
import { validateTuristSpotCreationMiddleware } from "../middlewares/validateTuristSpotCreation.middleware";
import { validateUserCreationMiddleware } from "../middlewares/validateUserCreation.middleware";
import { validateEmailExistsMiddleware } from "../middlewares/validateUserEmail.middleware";

const adminRoute = Router();

adminRoute.post(
    '/admin/register',
    validateUserCreationMiddleware,
    validateEmailExistsMiddleware,
    validateAdminPermission,
    AdminRegisterController
);

adminRoute.post(
    '/admin/createTuristSpot',
    validateTuristSpotCreationMiddleware,
);

export { adminRoute };
