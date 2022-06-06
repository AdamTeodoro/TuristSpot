import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const RatingPictureDeletionSchema = Joi.object({
    headers: HeaderSchema.required(),
    
    query: Joi.object({
        idPicture: Joi.number()
        .integer()
        .min(1)
        .max(9999999999999)
        .required(),

    }).required(),

}).unknown(true);
