import Joi from "joi";

export const GetTuristSpotRatingSchema = Joi.object({
    query: Joi.object({
        idTuristSpot: Joi.number()
        .min(0)
        .max(9999999999999)
        .required(),
        
        lastRating: Joi.date().iso().min(Joi.ref('start'))
    }).required()
});
