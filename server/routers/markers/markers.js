const express = require('express')
const RouterError = require('../../helpers/routerError/routerError.js')
const Auth = require('../../middlewares/Auth/Auth.js')
const SpamFilter = require('../../middlewares/SpamFilter/SpamFilter.js')
const SuggestedPlace = require('../../schema/SuggestedPlace.js')
const router = express.Router()


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

    
    router.post("/api/markers", Auth, SpamFilter(database), (req, res, next) => {
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
            next(new RouterError(400, "Failed to add new place"))
        })
    })

    router.put("/api/markers", Auth, async (req, res, next) => {
        const requestedUser = res.locals.user
        const params = req.query

        if (params.vote < 1 || params.vote > 5) {
            next(new RouterError(400, "Invalid vote value"))
            return
        }

        const places = await database.getPlaces({_id: params.id})
        const place = places && places[0]
        if (!place) {
            next(new RouterError(404, "Place was not found"))
            return
        }

        
        database.getUser({name: requestedUser.name})
        .then(user=> {
            for (let i = 0; i < user.votes.length; i++) {
                const votedPlace = user.votes[i]
                if (votedPlace._id === place._id) {
                    const difference = votedPlace.vote - params.vote
                    place.votes_value += difference
                    place.avg = place.votes_value / place.votes
                    votedPlace.value = params.vote
 
                    database.saveUser(user)
                    database.savePlace(place)
 
                    res.json({
                        success: true,
                        isFirstTime: false,
                        place: place
                    })
                } 
            }

            if (!res.headersSent) {
                place.votes++
                place.votes_value += params.vote
                place.avg = place.votes_value / place.votes
                user.votes.push({
                    ïd: place._id,
                    vote: params.vote,
                })

                database.saveUser(user)
                database.savePlace(place)

                res.json({
                    success: true,
                    isFirstTime: true,
                    place: place
                })
            }
        })

    })

    return router
}