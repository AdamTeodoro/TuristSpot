import Joi from "joi";


export const TuristSpostListSchema = Joi.object({
    query: Joi.object({
        lastTuristSpot: Joi.date().iso().min(Joi.ref('start'))
    })
});