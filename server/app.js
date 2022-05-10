const express = require("express")
const cors = require('cors')
const RouterErrorHandler = require("./helpers/routerError/routerErrorHandler")

const whitelist = ['http://localhost:3000', 'http://localhost:5000']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) callback(null, true)
        else callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
}

module.exports = (database) => {
    const app = express()
    
    app.use(express.json()) 
    app.use(cors(corsOptions))
    
    // Routers
    const register = require("./routers/register/register.js")(database)
    const login = require("./routers/login/login.js")(database)
    const markers = require("./routers/markers/markers.js")(database)
    const adminPanel = require("./routers/adminPanel/adminPanel.js")(database)
    
    app.use("/", register)
    app.use("/", login)
    app.use("/", markers)
    app.use("/", adminPanel)

    app.use(RouterErrorHandler)

    return app
}