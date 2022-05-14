const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required:  true,
    },
    role: {
        type: String,
        default: "admin",
    }
})

const admins = mongoose.model("admins", AdminSchema)

module.exports = admins