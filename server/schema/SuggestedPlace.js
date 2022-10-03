const mongoose = require("mongoose")

const Place = new mongoose.Schema({
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
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
    source: {
        type: String,
        required: true
    },
    rating: {
        stars: {
            type: [Boolean],
            default: [false, false, false, false, false]
        },
        avg: {
            type: Number,
            default: 0
        },
        votes: {
            type: Number,
            default: 0 
        },
        votes_value: {
            type: Number,
            default: 0
        }
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