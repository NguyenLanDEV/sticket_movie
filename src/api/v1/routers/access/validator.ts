import Joi from "Joi";

const schemaRegisterForm = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    rePassword: Joi.any().valid(Joi.ref('password')).messages({
        "any.only": "Mật khẩu không trùng nhau"
    }),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).required()
})

const schemaLoginForm = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export { schemaRegisterForm, schemaLoginForm }