const express = require('express')
const router = express.Router()
const RouterError = require("../../helpers/routerError/routerError")
const Auth = require("../../middlewares/Auth/Auth")

module.exports = (database) => {

    router.get("/user", Auth, async (req, res, next) => {
        const locals = res.locals
        const user = await database.getUser({ name: locals.user.name })

        delete user._id
        delete user.password

        res.json({
            success: true,
            user: {
                ...user
            }
        })
    })

    router.get("/user/favorites", Auth, async (req, res, next) => {
        const locals = res.locals
        const user = await database.getUser({ name: locals.user.name })

        res.json({
            success: true,
            favorites: user.favorites
        })
    })

    router.post("/user/favorites", Auth, async (req, res, next) => {
        const locals = res.locals
        const user = await database.getUser({ name: locals.user.name })
        const place = await database.getPlace({ _id: req.body._id })

        user.favorites.push(place)
        database.saveUser(user)
        .then(({ favorites }) => {
            res.json({
                success: true,
                favorites
            })
        })
    })

    router.delete("/user/favorites/:id", Auth, async (req, res, next) => {
        const locals = res.locals
        const user = await database.getUser({ name: locals.user.name })

        user.favorites = user.favorites.filter(favorite => favorite._id !== req.params.id)
        database.saveUser(user)
        .then(() => {
            res.json({
                success: true,
            })
        })
    })

    return router
}