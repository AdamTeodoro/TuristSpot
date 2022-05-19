import Joi from "joi";

import { AddressSchema } from "./Address.schema";

export const TuristSpotSchema = Joi.object({

    average: Joi.number()
    .min(0)
    .max(10)
    .required(),

    totalVisits: Joi.string()
    .min(3)
    .max(256)
    .trim()
    .required(),

    history: Joi.string()
    .min(3)
    .max(1000)
    .trim()
    .required(),
    
    Address: AddressSchema,

    status: Joi.equal(true),
  
}).unknown(false);
  