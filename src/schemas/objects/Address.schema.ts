import * as Joi from "joi";

export const AddressSchema = Joi.object({

    postalCode: Joi.string()
    .min(9)
    .max(9)
    .pattern(/^\d{5}-\d{3}$/)
    .required(),

    street: Joi.string()
    .min(3)
    .max(256)
    .trim()
    .required(),

    state: Joi.string()
    .min(2)
    .max(2)
    .trim()
    .required(),

    city: Joi.string()
    .min(3)
    .max(256)
    .trim()
    .required(),

    neighborhood: Joi.string()
    .min(3)
    .max(256)
    .trim()
    .required(),

}).unknown(false);
