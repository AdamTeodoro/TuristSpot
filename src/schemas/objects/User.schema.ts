import * as Joi from "joi";

export const UserSchema = Joi.object({

    userName: Joi.string()
    .min(3)
    .max(256)
    .trim()
    .required(),

    fullName: Joi.string()
    .min(3)
    .max(256)
    .trim()
    .required(),

}).unknown(false);
