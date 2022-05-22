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
    rarity: {
        type: String,
        required: true
    },
    rating: {
        stars: {
            type: [Boolean],
            required: true
        },
        avg: {
            type: Number,
            required: true
        },
        votes: {
            type: Number,
            required: true
        },
        votes_value: {
            type: Number,
            required: true
        }
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
        date: {
            type: Number,
            default: Date.now() / 1000,
        }
    }
})


module.exports = mongoose.model("Place", Place)