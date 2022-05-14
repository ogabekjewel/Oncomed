const mongoose = require("mongoose")

const DoctorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    full_name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    place_of_study: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
    },
})

const doctors = mongoose.model("doctors", DoctorSchema)

module.exports = doctors