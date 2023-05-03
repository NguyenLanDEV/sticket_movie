import express, { NextFunction, Request, Response } from "express"
import { trimExtraSpaces } from "./utils/middleware.util";

require('dotenv').config();
const morgan = require("morgan")
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express()

//init middleware
app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(trimExtraSpaces)

//init db
require('./dbs/init.mongodb')

//init routers
app.use(require("./routers/index"))

//Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.status ?? 500
    let message = (process.env.NODE_ENV == 'TEST' && statusCode == 500) ? err.message : "Server error!"

    if (process.env.NODE_ENV == 'TEST') {
        console.log(err)
    }
    
    switch (err.name) {
        case "TokenExpiredError":
            statusCode = 400;
            break;
        case "JsonWebTokenError":
            statusCode = 409;
            break;
    }
    return res.status(statusCode).json({
        message: message,
        status: statusCode,
    })
})

export { app } 