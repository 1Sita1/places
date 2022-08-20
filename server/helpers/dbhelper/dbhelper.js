const mongoose = require("mongoose")
const userSchema = require("../../schema/User")
const PlaceSchema = require("../../schema/Place")
const SuggestedPlaceSchema = require("../../schema/SuggestedPlace")

module.exports = {

    connect: async () => {
        const dbpass = process.env.DB_PASS
        const uri = `mongodb+srv://dbuser:${dbpass}@cluster.b3ptg.mongodb.net/app?retryWrites=true&w=majority`
        const result = await mongoose.connect(uri)
        return result
    },

    createUser: async (user) => {
        const result = await user.save()
        return result
    },

    getUser: async (params) => {
        const result = await userSchema.findOne(params)
        return result
    },

    saveUser: async (place) => {
        const result = await place.save()
        return result
    },

    savePlace: async (user) => {
        const result = await user.save()
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

    getPlace: async (filer) => {
        const result = await PlaceSchema.findOne(filer)
        return result
    },

    getSuggestedPlaces: async (filter) => {
        const result = await SuggestedPlaceSchema.find(filter)
        return result
    },

    getSuggestedPlace: async (filter) => {
        const result = await SuggestedPlaceSchema.findOne(filter)
        return result
    },

    deleteSuggestion: async (id) => {
        const result = await SuggestedPlaceSchema.deleteOne({_id: id})
        return result
    },

    acceptSuggestion: async (place) => {
        const result = await place.save(place)
        return result
    },
} 