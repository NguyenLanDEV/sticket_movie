import Joi from "Joi";

const schemaRegisterForm = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    rePassword: Joi.any().valid(Joi.ref('password')).messages({
        "any.only": "Mật khẩu không trùng nhau"
    }),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).required()
})

const schemaCreateForm = Joi.object({
    phone: Joi.string().pattern(/^(0|3|5|7|8|9|84)\d{9,10}/).required().messages({
        "string.pattern.base": "Định dạng không hợp lệ"
    }),
    name: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    avatar: Joi.string().optional()
    // password: Joi.string().required(),
})

export { schemaCreateForm }