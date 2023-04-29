import Joi from "Joi";
import * as joiUtil from "../../utils/util"

const schemaUpdateForm = Joi.object({
    cinemaId: Joi.string().required().custom(joiUtil.checkObjectId("cinemaId")),
    name: Joi.string().optional(),
    seats: Joi.number().min(0).optional()
})

const schemaCreateForm = Joi.object({
    cinemaId: Joi.string().required().custom(joiUtil.checkObjectId("cinemaId")),
    name: Joi.string().required(),
    seats: Joi.number().min(0).required()
})

export { schemaCreateForm, schemaUpdateForm }