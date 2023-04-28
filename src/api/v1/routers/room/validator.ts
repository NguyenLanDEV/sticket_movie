import Joi from "Joi";

const schemaUpdateForm = Joi.object({
    phone: Joi.string().pattern(/^(0|3|5|7|8|9|84)\d{9,10}/).optional().messages({
        "string.pattern.base": "Định dạng không hợp lệ"
    }),
    name: Joi.string().optional(),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).optional(),
    image: Joi.string().optional(),
})

const schemaCreateForm = Joi.object({
    phone: Joi.string().pattern(/^(0|3|5|7|8|9|84)\d{9,10}/).required().messages({
        "string.pattern.base": "Định dạng không hợp lệ"
    }),
    name: Joi.string().required(),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).required(),
    city: Joi.string().required(),
    image: Joi.string().optional(),
})

export { schemaCreateForm, schemaUpdateForm }