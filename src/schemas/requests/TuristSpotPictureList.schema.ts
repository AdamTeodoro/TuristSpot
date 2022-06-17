import Joi from "joi";

export const TuristSpotPictureListSchema = Joi.object({
    query: Joi.object({
        idTuristSpot: Joi.number().integer()
        .min(1)
        .max(9999999999999999999)
        .required()
    }).required(),
    
}).unknown(true);
