import Joi from "joi";

export const HeaderSchema = Joi.object({
  
    authorization: Joi.string()
        .min(3)
        .max(99999)
        .required()

}).unknown(true);
