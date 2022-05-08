const mongoose = require("mongoose")
const userSchema = require("../../schema/User")
const PlaceSchema = require("../../schema/Place")
const SuggestedPlaceSchema = require("../../schema/SuggestedPlace")

const dbpass = process.env.DB_PASS
const uri = `mongodb+srv://dbuser:${dbpass}@cluster.b3ptg.mongodb.net/app?retryWrites=true&w=majority`
mongoose.connect(uri)
.then(() => console.log("db connected"))
.catch((e) => {
    console.log(e)
})

module.exports = {

    createUser: async (user) => {
        const result = await user.save()
        return result
    },

    getUser: async (params) => {
        const result = await userSchema.findOne(params)
        return result
    },

    suggestPlace: async (place) => {
        const result = await place.save()
        return result
    },

    getPlaces: async (filer) => {
        const result = await PlaceSchema.find(filer)
        return result
    },

    getSuggestedPlaces: async (filter) => {
        const result = await SuggestedPlaceSchema.find(filter)
        return result
    },

    rejectSuggestion: async (id) => {
        const result = await SuggestedPlaceSchema.deleteOne({_id: id})
        return result
    },

    acceptSuggestion: async (place) => {
        const result = await PlaceSchema.save(place)
        return result
    },
}