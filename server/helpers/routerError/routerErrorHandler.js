const RouterError = require("./routerError")

module.exports = (err, req, res, next) => {
    //console.log(err)

    if (err instanceof RouterError) {
        res.status(err.code).json({
            success: false,
            message: err.message,
        })
        return
    }

    res.status(500).json({
        success: false,
        message: "Internal server error :<",
        err: err.message
    })
}