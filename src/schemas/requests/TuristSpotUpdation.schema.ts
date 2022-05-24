import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { TuristSpotSchema } from "../objects/TuristSpot.schema";

export const TuristSpotUpdationSchema = Joi.object({
  
    headers: HeaderSchema.required(),

    query: {
        idTuristSpot: Joi.number()
        .min(0)
        .max(999999999999)
        .required()
    },

    body: Joi.object({
        turistSpot: TuristSpotSchema.required(),
    }).required(),

}).unknown(true);
