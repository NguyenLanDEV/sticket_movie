import Joi from "Joi";
import * as joiUtil from "../../utils/util"

const schemaUpdateForm = Joi.object({
    name: Joi.string().optional(),
    image: Joi.string().optional(),
    description: Joi.string().optional(),
    casts:  Joi.array().items(Joi.custom(joiUtil.checkObjectId("castId"))).optional(),
    directors: Joi.array().items(Joi.custom(joiUtil.checkObjectId("directorId"))).optional(),
    producers: Joi.array().items(Joi.custom(joiUtil.checkObjectId("producerId"))).optional(),
    age: Joi.number().optional(),
    duration: Joi.number().optional(),
    releaseTime: Joi.date().optional()
})

const schemaCreateForm = Joi.object({
    name: Joi.string().optional(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    casts:  Joi.array().items(Joi.custom(joiUtil.checkObjectId("castId"))).optional(),
    directors: Joi.array().items(Joi.custom(joiUtil.checkObjectId("directorId"))).optional(),
    producers: Joi.array().items(Joi.custom(joiUtil.checkObjectId("producerId"))).optional(),
    age: Joi.number().required(),
    duration: Joi.number().required(),
    releaseTime: Joi.date().required()
})

export { schemaCreateForm, schemaUpdateForm }