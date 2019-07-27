let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")

let app = express()
let PORT = 3000
let MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, function() {
    console.log("Database: OK")
})

let dvdRoutes = require("./routes/dvd")

app.use(bodyParser.json())

app.use("/dvds", dvdRoutes)

app.listen(PORT, function() {
    console.log("Running app on port " + PORT)
})