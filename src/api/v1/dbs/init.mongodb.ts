require("dotenv").config()
const mongoose = require('mongoose');

const connectString = process.env.MONGO_URL
class Database {
    static instance: Database

    constructor(){
        this.connect()
    }

    connect(){
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then( (resolve: any) => {
            console.info("success::mongodb is connecting")
        }).catch( (reject: any) => {
            console.error("error:Connecting not success")
        });
    }
}

export = new Database()

