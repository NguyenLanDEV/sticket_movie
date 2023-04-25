import express, { NextFunction, Request, Response } from "express"

require('dotenv').config();
const morgan = require("morgan")
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express()

//init middlewares
app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))


//init db
require('./dbs/init.mongodb')

//init routers
app.use( require("./routers/index"))

//Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500
    console.log(err)
    return res.status(statusCode).json({
        message: err.message,
        status: statusCode,
    })
})

export {app} 