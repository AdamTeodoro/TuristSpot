import Joi from "joi";

export const LoginSchema = Joi.object({

    body: Joi.object({

        email: Joi.string()
        .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .required(),
    
        password: Joi.string()
        .min(8)
        .max(256)
        .required()

    }).unknown(false)
    
});
