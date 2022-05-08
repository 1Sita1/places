const express = require('express')
const User = require("../../schema/User")
const router = express.Router()
const RouterError = require("../../helpers/routerError/routerError")
const hasher = require("../../helpers/passwordHasher/passwordHasher")

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return String(email)
        .toLowerCase()
        .match(regExp)
}

function validatePassword(password) {
    return password.length >= 4 ? true : false
}

module.exports = (database) => {

    router.post("/api/register", (req, res) => {
        const user = req.body

        Promise.all(
            [
                database.getUser({
                    name: user.username,
                }), 
                database.getUser({
                    email: user.email
                })
            ]
        )
        .then(promises => {
            // User existence check
            const allFailed = (promises[0] === null && promises[1] === null)
            if (!allFailed) {
                throw new RouterError(406, "This email or username already exists")
            }

            // Password validation
            if(!validatePassword(user.password)) {
                throw new RouterError(411, "Length of password must be more than 4")
            }

            // Email validation
            if(!validateEmail(user.email)) {
                throw new RouterError(406, "Invalid email address")
            }


            return hasher.hash(user.password)
        })
        .then(hashedPassword => {
            const newUser = new User({
                name: user.username,
                email: user.email,
                password: hashedPassword
            })
            return database.createUser(newUser)
        })
        .then(() => {
            res.status(201).send({
                success: true,
            })
        })
        .catch(err => {
            res.status(err.code).send({
                success: false,
                error: err.message 
            })
        })
    })

    return router
}