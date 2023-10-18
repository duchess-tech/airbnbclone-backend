const express = require("express")
const app = express()
const { PORT, MONGO_URL } = require("./src/config/env")
const mongoose = require("mongoose")
const Airbnbroutes = require("./src/routes/Airbnbroutes")
const cors = require("cors")
app.use(cors())

function checknumber(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Request,Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS,DELETE")
    next()
}
app.use(checknumber)
app.use(express.json())
// app.get("/", (req, res) => {
//     res.send("hisss");
// });
// app.use("/", Airbnbroutes)
app.use("/login", Airbnbroutes)
app.use("/listing", Airbnbroutes)
app.use("/signup", Airbnbroutes)
app.use("/user", Airbnbroutes)
app.use("/propertyImage", Airbnbroutes)
app.use("/property", Airbnbroutes)
app.use("/category", Airbnbroutes)
mongoose.connect(MONGO_URL).
    then((res) => {
        console.log("database is connected")
    }
    )
    .catch((err) => {
        console.log("database not connected")
    })

app.listen(PORT, (res) => {
    console.log("apps is listening")

})

