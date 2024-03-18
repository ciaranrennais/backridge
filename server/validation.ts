import Joi from "joi";

// Person validation
export const PersonSchema = Joi.object({
    lastname: Joi.string().min(3).required(),
    firstame: Joi.string().min(3).required(),
    email: Joi.string().min(3).required()
});

// Organization validation
export const OrganizationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    countryISOCode: Joi.string().length(3).required(),
});
