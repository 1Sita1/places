const express = require("express")
const cors = require('cors')

module.exports = (database) => {
    const app = express()
    
    app.use(express.json()) 
    app.use(cors())
    
    // Routers
    const register = require("./routers/register/register.js")(database)
    const login = require("./routers/login/login.js")(database)
    const markers = require("./routers/markers/markers.js")(database)
    const adminPanel = require("./routers/adminPanel/adminPanel.js")(database)
    
    app.use("/", register)
    app.use("/", login)
    app.use("/", markers)
    app.use("/", adminPanel)

    return app
}