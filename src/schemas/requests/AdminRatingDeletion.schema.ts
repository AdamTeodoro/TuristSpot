import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const AdminRatingDeletionSchema = Joi.object({
    headers: HeaderSchema,
    query: Joi.object({
        idRating: Joi.number()
        .min(0)
        .max(9999999999999)
        .required()
    })
    
});