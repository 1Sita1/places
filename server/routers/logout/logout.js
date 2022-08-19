const express = require('express')
const RouterError = require("../../helpers/routerError/routerError")
const router = express.Router()

module.exports = (database) => {
    router.post("/logout", async (req, res, next) => {
        
        res.clearCookie("token")

        res.json({
            success: true
        })
    })

    return router
}