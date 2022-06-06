

import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const AdminInactivationSchema = Joi.object({
    headers: HeaderSchema,

    query: Joi.object({
        idSimpleUser: Joi.number()
        .integer()
        .min(1)
        .max(9999999999999)
        .required()
    })
});
