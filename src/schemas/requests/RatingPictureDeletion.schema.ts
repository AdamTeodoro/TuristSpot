import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const RatingPictureDeletionSchema = Joi.object({
    headers: HeaderSchema.required(),
    
    query: {
        idPicture: Joi.number()
            .integer()
            .min(1)
            .max(9999999999999)
            .required(),
    }

}).unknown(true);
