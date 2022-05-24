import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { UserSchema } from "../objects/User.schema";

export const AdminCreationSchema = Joi.object({
    header: HeaderSchema.required(),
    
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
