const mongoose = require("mongoose")

const NewsSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    img: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

const news = mongoose.model("news", NewsSchema)

module.exports = news