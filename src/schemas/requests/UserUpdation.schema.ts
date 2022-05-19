import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { UserSchema } from "../objects/User.schema";

export const UserCreationSchema = Joi.object({

    headers: HeaderSchema.required(),

    body: Joi.object({

        user: UserSchema,

        pass: Joi.object({
            newPassword: Joi.string()
            .min(8)
            .max(256)
            .required(),
    
            oldPassword: Joi.string()
            .min(8)
            .max(256)
            .required()
        })

    }).or('user', 'pass').unknown(false),

}).unknown(true);
