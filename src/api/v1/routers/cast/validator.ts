import Joi from "Joi";
import * as joiUtil from "../../utils/util"

const schemaUpdateForm = Joi.object({
    name: Joi.string().optional(),
    avatar: Joi.string().optional(),
    description: Joi.string().optional(),
    birthDay: Joi.date().optional(),
    createBy: Joi.custom(joiUtil.checkObjectId("createBy"))
})

const schemaCreateForm = Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    description: Joi.string().required(),
    birthDay: Joi.date().required(),
    createBy: Joi.custom(joiUtil.checkObjectId("createBy"))
})

export { schemaCreateForm, schemaUpdateForm }