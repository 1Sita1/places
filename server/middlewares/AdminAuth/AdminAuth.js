const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

module.exports = (req, res, next) => {
    const token = req.headers.token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err || decoded.name !== process.env.ADMIN_NAME) {
            res.sendStatus(403)
        }
        else {
            res.locals.user = decoded
            next()
        }
    })
}