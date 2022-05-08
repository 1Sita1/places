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
        .catch(() => {
            res.status(500).json({
                success: false
            })
        })

    })

    router.put("/api/admin/suggestedplaces", AdminAuth, (req, res) => {
        const params = req.query

        database.getSuggestedPlaces(params.id)
        .then(result => {
            if (!result) throw new RouterError(404, "Place was not found")
            result = result[0]
            const id = result._id
            delete result._id

            const newPlace = new Place({
                ...result,
                rarity: params.rarity,
                rating: {
                    stars: [false, false, false, false, false],
                    avg: 0,
                    votes: 0,
                }
            })

            newPlace.save()
            .then(result2 => {
                database.rejectSuggestion(id)
                .then(() => {
                    res.send({
                        success: true,
                        ...result2
                    })
                })
            })
        })
        .catch(err => {
            if (err instanceof RouterError) {
                res.status(err.status).json({
                    success: false,
                    message: err.message
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    message: "Server error"
                })
            }
        })

    })

    return router
}