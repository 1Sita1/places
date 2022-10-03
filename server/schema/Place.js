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
    source: {
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
    },
    approvedBy: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Place", Place)