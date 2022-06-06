import Joi from "joi";

export const TuristSpotRatingGetSchema = Joi.object({
    query: Joi.object({
        idTuristSpot: Joi.number()
        .integer()
        .min(1)
        .max(9999999999999)
        .required(),
        
        lastRating: Joi.date().iso().min(Joi.ref('start'))
    }).required()
});
