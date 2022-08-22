const express = require('express')
const RouterError = require('../../helpers/routerError/routerError.js')
const Auth = require('../../middlewares/Auth/Auth.js')
const SpamFilter = require('../../middlewares/SpamFilter/SpamFilter.js')
const SuggestedPlace = require('../../schema/SuggestedPlace.js')
const getStarsArrayFromNumber = require('../../helpers/starsArrayFromNumber/getStarsArrayFromNumber')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.IMG_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: function(_req, file, cb){
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null,true);
        } else {
            _req.fileValidationError = "Forbidden image extension";
            cb(null, false, _req.fileValidationError);
        }
    }
}).single("place-img")


module.exports = (database) => {

    router.get("/markers", (req, res) => {
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

    
    router.post("/markers", Auth, SpamFilter(database), upload, (req, res, next) => {
        if (req.fileValidationError) {
            next(new RouterError(400, "Image validation error"))
            return
        }

        const user = res.locals.user
        const suggested = req.body

        const newPlace = new SuggestedPlace({
            ...suggested,
            img: req?.file?.filename,
            location: JSON.parse(suggested.location),
            created: {
                by: user.name,
                at: ~~(Date.now() / 1000)
            }
        })

        database.suggestPlace(newPlace) 
        .then(() => {
            res.status(201).json({
                success: true,
                place: newPlace
            })
        })
        .catch(err => {
            console.log(err.message) 
            fs.unlink(process.env.IMG_PATH + req?.file?.filename, (err) => {
                if (err) console.log(err)
                else console.log("file deleted")
                next(new RouterError(400, "Failed to add new place"))
            })
        })
    })

    router.patch("/markers", Auth, async (req, res, next) => {
        const requestedUser = res.locals.user 
        const params = req.body

        if (!(params.vote >= 1 && params.vote <= 5)) {
            next(new RouterError(400, "Invalid vote value"))
            return
        }

        const place = await database.getPlaceById(params.id)
        if (!place) {
            next(new RouterError(400, "Place was not found"))
            return
        }

        
        database.getUser({name: requestedUser.name})
        .then(user=> {
            let userPrevVote = null
            for (let i = 0; i < user.votes.length; i++) {
                if (user.votes[i].id.equals(place._id)) userPrevVote = i
            }

            if (userPrevVote === null) {
                place.rating.votes++
                place.rating.votes_value += params.vote
                place.rating.avg = place.rating.votes_value / place.rating.votes
                place.rating.stars = getStarsArrayFromNumber(place.rating.avg)
                user.votes.push({
                    id: place._id, 
                    vote: params.vote,
                })

                database.saveUser(user)
                database.savePlace(place)

                res.json({
                    success: true,
                    isFirstTime: true,
                    newRating: place.rating
                })
            }

            else {
                const difference = user.votes[userPrevVote].vote - params.vote
                place.rating.votes_value -= difference
                place.rating.avg = place.rating.votes_value / place.rating.votes
                place.rating.stars = getStarsArrayFromNumber(place.rating.avg)
                user.votes[userPrevVote].vote = params.vote
                user.markModified("votes")

                database.saveUser(user)
                .then(res => console.log(res))
                database.savePlace(place)

                res.json({
                    success: true,
                    isFirstTime: false,
                    newRating: place.rating
                })
            }
        })

    })

    return router
}