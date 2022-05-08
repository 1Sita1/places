const express = require('express')
const RouterError = require("../../helpers/routerError/routerError")
const hasher = require("../../helpers/passwordHasher/passwordHasher")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router()

module.exports = (database) => {
    router.post("/api/login", (req, res) => {
        const body = req.body
        let id = null
        let email = body.username
        let username = body.username
        const password = body.password
    
        database.getUser({
            $or: [
                {
                    name: username
                },
                {
                    email: email
                }
            ]
        })
        .then(result => {
            if (!result) {
                // User was not found in database
                throw new RouterError(400, "Incorrect username (email) or pasword")
            }
            id = result._id
            username = result.username
            email = result.email
            return hasher.compare(password, result.password)
        })
        .then(result => {
            res.status(200).send({
                success: true,
                token: jwt.sign({ id: id, name: username }, process.env.JWT_KEY)
            })
        })
        .catch(err => { 
            if (err instanceof RouterError) {
                res.status(err.code).send({
                    success: false,
                    err: err.message
                })
            }
            else {
                console.log(err)
                res.status(500).send({
                    success: false,
                    err: "Oops, looks like server is broken"
                })
            }
        })
    })

    return router
}