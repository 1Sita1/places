const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    votes: {
        type: Array,
        required: true
    },
    favorites: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("User", User)