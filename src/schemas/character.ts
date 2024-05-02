import Joi from "joi";

export const characterSchema = Joi.object({
    page: Joi.number().greater(0).default(1),
    pageSize: Joi.number().greater(0).default(10),
    name: Joi.string().optional().default(""),
    status: Joi.string().optional().valid('alive','dead','unknown','').default(""),
    species: Joi.string().optional().default(""),
    type: Joi.string().optional().default(""),
    gender: Joi.string().optional().valid('female','male','genderless','unknown','').default(""),
});

export const characterParamsSchema = Joi.object({
    id: Joi.number().greater(0).default(1),
});
