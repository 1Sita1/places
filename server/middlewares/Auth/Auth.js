const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.headers.token
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