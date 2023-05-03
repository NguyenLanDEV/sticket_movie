import Joi from "Joi";
import * as joiUtil from "../../utils/util"

const schemaUpdateForm = Joi.object({
    movieId: Joi.custom(joiUtil.checkObjectId("movieId")).optional(),
    roomId: Joi.custom(joiUtil.checkObjectId("roomId")).optional(),
    cinemaId: Joi.custom(joiUtil.checkObjectId("cinemaId")).optional(),
    price: Joi.number().optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
    createBy: Joi.custom(joiUtil.checkObjectId("createBy")),
    seats: Joi.array().default([])
})

const schemaCreateForm = Joi.object({
    movieId: Joi.custom(joiUtil.checkObjectId("movieId")).required(),
    roomId: Joi.custom(joiUtil.checkObjectId("roomId")).required(),
    cinemaId: Joi.custom(joiUtil.checkObjectId("cinemaId")).required(),
    price: Joi.number().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    createBy: Joi.custom(joiUtil.checkObjectId("createBy")),
    seats: Joi.array().default([])
})

export { schemaCreateForm, schemaUpdateForm }