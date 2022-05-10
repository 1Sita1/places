const express = require('express')
const router = express.Router()
const RouterError = require("../../helpers/routerError/routerError")
const AdminAuth = require("../../middlewares/AdminAuth/AdminAuth")
const Place = require('../../schema/Place')


module.exports = (database) => {

    router.get("/api/admin/suggestedplaces", AdminAuth, (req, res) => {
        const filter = req.query

        database.getSuggestedPlaces(filter)
        .then(result => {
            res.json({
                success: true,
                places: result
            })
        })
    })

    router.delete("/api/admin/suggestedplaces", AdminAuth, (req, res) => {
        const params = req.query

        database.rejectSuggestion(params.id)
        .then(result => {
            res.json({
                success: true,
                ...result
            })
        })
    })

    router.put("/api/admin/suggestedplaces", AdminAuth, async (req, res) => {
        const params = req.query

        const places = database.getSuggestedPlaces(params.id)
        if (!places) return next(new RouterError(404, "Place was not found"))

        const place = places[0]
        const id = place._id
        delete place._id

        const newPlace = new Place({
            ...place,
            rarity: params.rarity,
            rating: {
                stars: [false, false, false, false, false],
                avg: 0,
                votes: 0,
            }
        })

        const savingResult = await database.suggestPlace(newPlace)
        const rejectionReult = await database.rejectSuggestion(id)
        res.send({
            success: true,
            ...savingResult
        })
    })

    return router
}