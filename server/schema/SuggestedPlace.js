const mongoose = require("mongoose")

const Place = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created: {
        by: {
            type: String,
            required: true
        },
        at: {
            type: Number,
            default: Date.now() / 1000,
        }
    }
})


module.exports = mongoose.model("suggestedPlace", Place)