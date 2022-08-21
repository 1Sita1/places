const express = require('express')
const router = express.Router()
const RouterError = require("../../helpers/routerError/routerError")
const AdminAuth = require("../../middlewares/AdminAuth/AdminAuth")
const Place = require('../../schema/Place')
const fs = require("fs")


module.exports = (database) => {

    router.get("/suggestedplaces", AdminAuth, (req, res) => {
        const filter = req.query

        database.getSuggestedPlaces(filter)
        .then(result => {
            res.json({ 
                success: true,
                places: result
            })
        })
    })

    router.post("/suggestedplaces/approve", AdminAuth, async (req, res, next) => {
        const admin = res.locals.user
        const params = req.body 

        const place = await database.getSuggestedPlace({ _id: params.id })
        if (!place) {
            next(new RouterError(400, "Place was not found"))
            return
        }

        const newPlace = new Place({
            ...JSON.parse(JSON.stringify(place)), 
            rarity: params.rarity,
            approvedBy: admin.name
        })

        const savingResult = await database.acceptSuggestion(newPlace)
        await database.deleteSuggestion(params.id)
        res.json({
            success: true,
            result: savingResult
        })
    })

    router.delete("/suggestedplaces/decline", AdminAuth, async (req, res, next) => {
        const params = req.body

        const place = await database.getSuggestedPlace({ _id: params.id })
        if (!place) {
            console.log(place)
            next(new RouterError(404, "Place was not found"))
            return
        }

        database.deleteSuggestion(place._id)
        .then(() => {
            fs.unlink(process.env.IMG_PATH + place.img, (err) => {
                if (err) next(new RouterError(400, err.message))
                res.json({
                    success: true
                })
            })
        })
        .catch(err => {
            next(new RouterError(400, err.message))
        })
    })

    return router
}