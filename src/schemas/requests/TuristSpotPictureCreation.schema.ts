import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const TuristSpotPictureCreationSchema = Joi.object({
    query: Joi.object({
        idItem: Joi.number()
        .min(0)
        .max(9999999999999)
        .required(),
    }).required(),
    headers: HeaderSchema.required(),

}).unknown(true);
