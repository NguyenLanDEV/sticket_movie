import express, { NextFunction, Request, Response } from "express"
import { trimExtraSpaces } from "./utils/middleware.util";
import {ErrorResponse, AuthErrorResponse } from "./utils/handleResponse.util"
require('dotenv').config();
const morgan = require("morgan")
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
//init middleware
app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(trimExtraSpaces)
app.use(cors())
//init db
require('./dbs/init.mongodb')

//init routers
app.use(require("./routers/index"))

//Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number = 400
    let isJwtError = false
    console.log(err);
    
    switch (err.name) {
        case "TokenExpiredError":
            return new AuthErrorResponse({message: err.message, status: 400}, 'auth-002').send(res)
        case "JsonWebTokenError":
            return new AuthErrorResponse({message: err.message, status: 409}, 'auth-003').send(res)
    }
    if(isJwtError){
        return res.status(statusCode).json({
            message: err.message,
            status: statusCode,
        })
    }
    next(err)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.status ?? 500
    let message = statusCode == 500 ? "Server error!" : err.message 

    if (process.env.NODE_ENV == 'TEST') {
        console.log(err)
        message = err.message
    }

    return new ErrorResponse({status: statusCode, message: message}, statusCode == 500 ? 'backend-001' : 'client-001')
})

export { app } 