import Joi from "joi";

export const TuristSpotSchema = Joi.object({

    average: Joi.number()
    .min(0)
    .max(10)
    .required(),

    totalVisitsReceived: Joi.number()
    .min(0)
    .max(999999999999999)
    .required(),

    history: Joi.string()
    .min(3)
    .max(1000)
    .trim()
    .required(),
    
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
  