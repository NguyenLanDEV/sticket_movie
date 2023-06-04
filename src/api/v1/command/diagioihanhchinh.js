'use strict';


const fs = require("fs");
const mongoose = require('mongoose');

class Database {
    static instance

    constructor(){
        this.connect()
    }

    connect(){
        mongoose.connect(
            'mongodb+srv://ticketmovie:hTSoi56PHlOzF8Nv@cluster0.akxdazc.mongodb.net/movies', {
            maxPoolSize: 50
        }).then( (resolve) => {
            console.info("success::mongodb is connecting")
        }).catch( (reject) => {
            console.error("error:Connecting not success")
        });
    }
}
new Database()
const citySchema = new mongoose.Schema({
    _id: { type: String, alias: "id" },
    name: {
        type: String,
        required: true,
    },
    districts: {type: Array}
}, {collection: 'cities', versionKey: false, timestamps: true})
const cityCollection = mongoose.model('cities', citySchema)

let rawData = fs.readFileSync('./DiaGioiHanhChinh.json');
let cities = JSON.parse(rawData);
    cities.forEach(city => {
        cityCollection.create({"_id": city.id, "name": city.name, districts: city.districts })
    });


