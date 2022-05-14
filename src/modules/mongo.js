const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

// Imports
require("../model/DoctorsModel")
require("../model/NewsModel")
require("../model/AdminsModel")

module.exports = async function() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log(`MONGO CONNECTED`)
    } catch(e) {
        console.log(`MONGO CONNECT FAILED` + e)
    }
}