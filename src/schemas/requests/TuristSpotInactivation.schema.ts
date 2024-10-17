import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const TuristSpotInactivationSchema = Joi.object({
    query: Joi.object({
        idTuristSpot: Joi.number()
            .integer()
            .min(1)
            .max(9999999999999)
            .required(),
    }).required(),
    
    headers: HeaderSchema.required(),

}).unknown(true);