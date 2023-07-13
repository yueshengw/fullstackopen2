const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const notesRouter = require("./controllers/notes")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

logger.info("Connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        logger.error("Error connecting to MongoDB:", error.message)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)

app.use(middleware.unKnownEndpoint)
app.use(middleware.errorHandler)

module.exports = app