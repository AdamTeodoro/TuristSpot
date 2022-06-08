import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const RatingCreationSchema = Joi.object({
    headers: HeaderSchema.required(),
    
    query: Joi.object({
        idTuristSpot: Joi.number()
        .integer()
        .min(1)
        .max(9999999999999)
        .required()
    }).required(),

    body: {
        rating: Joi.object({
            commentary: Joi.string()
            .min(3)
            .max(256)
            .required(),

            rating: Joi.number()
            .min(0)
            .max(10)
            .required()
        }).required()
    }

}).unknown(true);
