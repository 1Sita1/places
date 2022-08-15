const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const RouterErrorHandler = require("./helpers/routerError/routerErrorHandler")
const dotenv = require('dotenv')
dotenv.config()

const whitelist = process.env.NODE_ENV == "test" ? ['http://localhost:3000', 'http://localhost:5000', undefined, "chrome-extension://gmmkjpcadciiokjpikmkkmapphbmdjok"] : null
console.log(process.env.NODE_ENV )
const corsOptions = { 
    origin: (origin, callback) => { 
        if (whitelist.includes(origin)) callback(null, true)
        else callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
}

module.exports = (database) => {
    database.connect()
    .then(() => console.log("db connected"))
    .catch(err => console.error(err)) 
    const app = express()
    
    app.use(express.json()) 
    app.use(cors(corsOptions))
    app.use(cookieParser())
    
    // Routers
    const user = require("./routers/user/user.js")(database)
    const register = require("./routers/register/register.js")(database)
    const login = require("./routers/login/login.js")(database)
    const markers = require("./routers/markers/markers.js")(database)
    const adminPanel = require("./routers/adminPanel/adminPanel.js")(database)
    
    app.use("/", user)
    app.use("/", register)
    app.use("/", login)
    app.use("/", markers)
    app.use("/", adminPanel)

    app.use(RouterErrorHandler)

    return app
}