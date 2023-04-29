import Joi from "Joi";
import * as joiUtil from "../../utils/util"

const schemaUpdateForm = Joi.object({
    phone: Joi.string().pattern(/^(0|3|5|7|8|9|84)\d{9,10}/).optional().messages({
        "string.pattern.base": "Định dạng không hợp lệ"
    }),
    name: Joi.string().optional(),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    avatar: Joi.string().optional(),
    clusterId: Joi.string().custom(joiUtil.checkObjectId("clusterId")).optional()
})

const schemaCreateForm = Joi.object({
    phone: Joi.string().pattern(/^(0|3|5|7|8|9|84)\d{9,10}/).required().messages({
        "string.pattern.base": "Định dạng không hợp lệ"
    }),
    name: Joi.string().required(),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    avatar: Joi.string().optional(),
    clusterId: Joi.string().custom(joiUtil.checkObjectId("clusterId")).required()
})

export { schemaCreateForm, schemaUpdateForm }