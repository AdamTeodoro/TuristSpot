import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const RatingPictureCreationSchema = Joi.object({
    headers: HeaderSchema.required(),
    
    query: Joi.object({
        idRating: Joi.number()
        .integer()
        .min(1)
        .max(9999999999999)
        .required()
    }).required(),

}).unknown(true);
