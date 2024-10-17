import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { UserSchema } from "../objects/User.schema";

export const UserUpdationSchema = Joi.object({

    headers: HeaderSchema.required(),

    body: Joi.object({

        user: UserSchema.required(),

        pass: Joi.object({
            newPassword: Joi.string()
                .min(8)
                .max(256),
    
            oldPassword: Joi.string()
                .min(8)
                .max(256)
                .required()
        }).required()

    }).unknown(false),

}).unknown(true);
