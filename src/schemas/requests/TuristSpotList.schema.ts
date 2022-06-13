import Joi from "joi";

export const TuristSpotListSchema = Joi.object({

    query: Joi.object({
        lastTuristSpot: Joi.number().integer(),
    }),

}).unknown(true);
