import Joi from "joi";

import { UserSchema } from "../objects/User.schema";

export const UserCreationSchema = Joi.object({
    query: Joi.object({

        idPermission: Joi.number()
        .min(0)
        .max(999999999999)

    }).unknown(false),

    body: Joi.object({

        user: UserSchema.required(),

        password: Joi.string()
        .min(8)
        .max(256)
        .required()

    }).unknown(false).required(),

}).unknown(true);
