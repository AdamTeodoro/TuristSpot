import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const TuristSpotPictureDeletionSchema = Joi.object({
    
    query: Joi.object({
        idPicture: Joi.number()
            .min(1)
            .max(9999999999999)
            .required(),
    }).required(),

    headers: HeaderSchema.required(),

}).unknown(true);
