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
        }).required(),
        
        email: Joi.string()
        .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .required(),

    }).unknown(false),

}).unknown(true);
