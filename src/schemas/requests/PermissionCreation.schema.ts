import Joi from "joi";

import { HeaderSchema } from "../objects/Header.schema";

export const PermissionCreationSchema  = Joi.object({
    headers: HeaderSchema.required(),
}).unknown(true);
