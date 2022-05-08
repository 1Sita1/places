const dotenv = require('dotenv')
dotenv.config()
const database = require("./helpers/dbhelper/dbhelper")
const makeApp = require("./app")

const PORT = process.env.PORT
const app = makeApp(database)

app.listen(PORT, () => console.log(`App started on port ${PORT}`)) 
