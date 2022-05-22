const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null 

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) {
            res.sendStatus(403)
        }
        else {
            res.locals.user = decoded
            next()
        }
    })
}