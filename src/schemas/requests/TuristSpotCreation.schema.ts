import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { TuristSpotSchema } from "../objects/TuristSpot.schema";

export const TuristSpotCreationSchema = Joi.object({
  
    headers: HeaderSchema.required(),

    body: Joi.object({
        turistSpot: TuristSpotSchema.required(),
    }).required(),

}).unknown(true);
