import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";
import { TuristSpotSchema } from "../objects/TuristSpot.schema";

export const TuristSpotCreationSchema = Joi.object({
  
    headers: HeaderSchema,

    body: Joi.object({
        turistSpot: TuristSpotSchema,
    }),

}).unknown(true);
