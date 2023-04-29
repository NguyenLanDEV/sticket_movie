import Joi from "Joi";
import * as joiUtil from "../../utils/util"
import * as Const from "../../utils/const.util"

const schemaUpdateForm = Joi.object({
    roomId: Joi.string().required().custom(joiUtil.checkObjectId("roomId")).optional(),
    type: Joi.string().valid(...Const.TypeSeat).required().optional(),
    row: Joi.number().min(0).optional().optional(),
    seatNumber: Joi.number().min(0).optional().optional(),
    isAvailable: Joi.boolean().optional().optional(),
})

const schemaCreateForm = Joi.object({
    roomId: Joi.string().required().custom(joiUtil.checkObjectId("roomId")),
    type: Joi.string().valid(...Const.TypeSeat).required(),
    row: Joi.number().min(0).optional(),
    seatNumber: Joi.number().min(0).optional(),
    isAvailable: Joi.boolean().optional(),
})

export { schemaCreateForm, schemaUpdateForm }