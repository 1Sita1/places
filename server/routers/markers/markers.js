const express = require('express')
const Auth = require('../../middlewares/Auth/Auth.js')
const SpamFilter = require('../../middlewares/SpamFilter/SpamFilter.js')
const SuggestedPlace = require('../../schema/SuggestedPlace.js')
const router = express.Router()
const markers = require("../../storage/markers.js")


module.exports = (database) => {

    router.get("/api/markers", (req, res) => {
        const params = req.query

        switch(params.type) {
            case "golden":
                database.getPlaces({type: "golden"})
                .then(result => {
                    res.json(result)
                })
            break

            case "silver":
                database.getPlaces({type: "silver"})
                .then(result => {
                    res.json(result)
                })
            break

            case "bronze":
                database.getPlaces({type: "bronze"})
                .then(result => {
                    res.json(result)
                })
            break

            default:
                database.getPlaces({})
                .then(result => {
                    res.json(result)
                })
            break
        }
    })

    
    router.post("/api/markers", Auth, SpamFilter(database), (req, res) => {
        const user = res.locals.user
        const suggested = req.body.marker

        const newPlace = new SuggestedPlace({
            ...suggested,
            created: {
                by: user.name,
                at: Date.now() / 1000
            }
        })

        database.suggestPlace(newPlace) 
        .then(() => {
            res.status(201).send(newPlace)
        })
        .catch(err => {
            res.status(400).send(err)
        })
    })

    return router
}