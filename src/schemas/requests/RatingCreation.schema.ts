import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const TuristSpotPictureCreationSchema = Joi.object({
    headers: HeaderSchema.required(),
    query: Joi.object({
        idTuristSpot: Joi.number()
        .min(0)
        .max(99999999999)
        .required()
    }),
    body: Joi.object({
        rating: Joi.object({
            
            commentary: Joi.string()
            .min(3)
            .max(256)
            .required(),

            rating: Joi.number()
            .min(1)
            .max(10)
            .required()

        }).required()
    })

}).unknown(true);
