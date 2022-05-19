import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { UserSchema } from "../objects/User.schema";

export const UserCreationSchema = Joi.object({

    headers: HeaderSchema,

    query: Joi.object({

        idPermission: Joi.number()
        .min(0)
        .max(999999999999)

    }).and('authorization', 'idPermission').unknown(false),

    body: Joi.object({

        user: UserSchema,

        password: Joi.string()
        .min(8)
        .max(256)
        .required()

    }).unknown(false).required(),

}).unknown(true);

// 24 - 7 = 17
// 17 - 4 = 

