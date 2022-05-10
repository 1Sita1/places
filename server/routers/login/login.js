const express = require('express')
const RouterError = require("../../helpers/routerError/routerError")
const hasher = require("../../helpers/passwordHasher/passwordHasher")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router()

module.exports = (database) => {
    router.post("/api/login", async (req, res, next) => {
        const request = {
            ...req.body,
            id: null
        }

        const user = await database.getUser({
            $or: [
                {
                    name: request.username
                },
                {
                    email: request.email
                }
            ]
        })

        if (!user) {
            // User was not found in database
            return next(new RouterError(400, "Incorrect username (email) or pasword"))
        }

        const passwordValidated = await hasher.compare(request.password, user.password)
        if (!passwordValidated) {
            // Incorrect password
            return next(new RouterError(400, "Incorrect username (email) or pasword"))
        }

        const isAdmin = user.name === process.env.ADMIN_NAME
        const token = jwt.sign({ 
            id: user._id, 
            name: user.name,
            admin: isAdmin,
        }, process.env.JWT_KEY)

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        })
        .send({
            success: true,
            name: user.name,
            admin: isAdmin,
        })
    })

    return router
}