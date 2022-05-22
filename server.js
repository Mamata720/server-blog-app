const  express = require("express");
const fileUpload = require("express-fileupload");
const { router } = require("./router/routes");
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(fileUpload())
app.use(express.static('public'))
app.use(express.json())
app.use("/",router)


app.listen(process.env.PORT)