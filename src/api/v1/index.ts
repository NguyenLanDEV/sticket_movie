import express, { NextFunction, Request, Response } from "express"
import { trimExtraSpaces } from "./utils/middleware.util";

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
    let statusCode = err.status ?? 500
    let message = statusCode == 500 ? "Server error!" : err.message 
    switch (err.name) {
        case "TokenExpiredError":
            statusCode = 400;
            break;
        case "JsonWebTokenError":
            statusCode = 409;
            break;
    }

    if (process.env.NODE_ENV == 'TEST') {
        console.log(err)
        message = err.message
    }

    return res.status(statusCode).json({
        message: message,
        status: statusCode,
    })
})

export { app } 