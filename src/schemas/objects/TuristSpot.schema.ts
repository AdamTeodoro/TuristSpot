import Joi from "joi";

export const TuristSpotSchema = Joi.object({

    totalVisitsReceived: Joi.number()
        .integer()
        .min(1)
        .max(999999999999999)
        .required(),

    history: Joi.string()
        .min(3)
        .max(1000)
        .trim()
        .required(),
    
    isActive: Joi.boolean(),

    state: Joi.string()
        .min(3)
        .max(256)
        .trim()
        .required(),

    city: Joi.string()
        .min(3)
        .max(256)
        .trim()
        .required(),

    street: Joi.string()
        .min(3)
        .max(256)
        .trim()
        .required(),

    postalCode: Joi.string()
        .min(9)
        .max(9)
        .pattern(/^\d{5}-\d{3}$/)
        .required(),

}).unknown(false);
  