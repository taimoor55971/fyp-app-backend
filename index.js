require("dotenv").config() // load .env variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
// const AuthRouter = require("./routes/auth.router") //import Authentication Routes


//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT} = process.env

// Create Application Object
const app = express()

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({extended: true})) // parse form data

//Adding Routes
// Before using the route on line # 23, please uncomment the import as well as correct the code in auth.router.js
// app.use("/api/auth", AuthRouter) // send all "/auth" requests to AuthRouter for routing


// Default Route
app.get("/", (req, res) => {
    res.send("Express Server is Up and Running ...")
})


// APP LISTENER / START THE SERVER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))
