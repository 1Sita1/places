const express = require('express')
const User = require("../../schema/User")
const router = express.Router()
const RouterError = require("../../helpers/routerError/routerError")
const hasher = require("../../helpers/passwordHasher/passwordHasher")
const jwt = require("jsonwebtoken")

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

    router.post("/api/register", async (req, res, next) => {
        const request = req.body

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

        if (user) {
            return next(new RouterError(406, "This email or username already exists"))
        }

        // Password validation
        if(!validatePassword(request.password)) {
            return next(new RouterError(411, "Length of password must be more than 4"))
        }

        // Email validation
        if(!validateEmail(request.email)) {
            return next(new RouterError(406, "Invalid email address"))
        }

        const hashedPassword = await hasher.hash(request.password)
        const newUser = new User({
            name: request.username,
            email: request.email,
            password: hashedPassword,
            votes: [],
            favorites: [],
        })

        const createdUser = await database.createUser(newUser)
        const isAdmin = createdUser.name === process.env.ADMIN_NAME
        const token = jwt.sign({ 
            id: createdUser._id, 
            name: createdUser.name, 
            admin: isAdmin,
        }, process.env.JWT_KEY)

        res.status(201)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        })
        .json({
            success: true,
            name: createdUser.name,
            admin: isAdmin,
        })
    })

    return router
}