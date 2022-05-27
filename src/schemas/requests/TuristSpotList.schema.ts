import Joi from "joi";

export const TuristSpotListSchema = Joi.object({
    query: Joi.object({
        lastTuristSpot: Joi.date(),
    }),
}).unknown(true);