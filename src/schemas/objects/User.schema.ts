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

    email: Joi.string()
    .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .required(),

}).unknown(false);
