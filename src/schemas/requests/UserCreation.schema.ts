import Joi from "joi";

import { UserSchema } from "../objects/User.schema";

export const UserCreationSchema = Joi.object({

    query: Joi.object({
        authorization: Joi.string()
        .min(1)
        .max(99999999999999),

        idPermission: Joi.number()
        .integer()
        .min(1)
        .max(9999999999999)
    
    }).unknown(false),

    body: Joi.object({

        user: UserSchema.required(),

        password: Joi.string()
        .min(8)
        .max(256)
        .required(),
        
    }).unknown(false)
    .required(),

}).unknown(true);
