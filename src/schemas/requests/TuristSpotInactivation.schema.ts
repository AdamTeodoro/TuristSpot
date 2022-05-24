import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const TuristSpotInactivationSchema = Joi.object({
    query: Joi.object({
        idTuristSpot: Joi.number()
        .min(0)
        .max(9999999999999)
        .required(),
    }).required(),
    headers: HeaderSchema.required(),

}).unknown(true);