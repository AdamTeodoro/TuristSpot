import Joi from "joi";


export const RatingPictureSchema = Joi.object({
    query: Joi.object({
        idRating: Joi.number().integer()
        .min(1)
        .max(9999999999999999999)
        .required()
    }).required(),
    
}).unknown(true);