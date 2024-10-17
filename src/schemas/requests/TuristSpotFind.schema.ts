import Joi from "joi";


export const TuristSpotFindSchema = Joi.object({
    query: Joi.object({
        postalCode: Joi.string()
            .min(9)
            .max(9)
            .pattern(/^\d{5}-\d{3}$/),

        street: Joi.string()
            .min(1)
            .max(500),

        city: Joi.string()
            .min(1)
            .max(500),

        state: Joi.string()
            .min(1)
            .max(500),

    }).or('state', 'city', 'street', 'postalCode')
}).unknown(true);