"use strict";
import { app } from "./src/api/v1/index"
const http = require('http');

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log("WSV Ecommerce start with port: " + process.env.SERVER_PORT)
})

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"))
})