import Joi from "joi";

export const TuristSpotListSchema = Joi.object({

    query: Joi.object({
        lastTuristSpot: Joi.number()
            .integer()
            .min(1)
            .max(9999999999999),
    }),

}).unknown(true);
