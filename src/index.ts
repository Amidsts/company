import express, { urlencoded } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import {connect} from "mongoose"
import fileUpload from "express-fileupload"
import path from "path"

import { PORT, DBURL } from "./utils/config"
import adminRoutes from "./routes/admin.route"
import { SEEDNOW } from "./utils/seed"
import { cloudinary } from "./utils/helpers"

const app = express()

connect(DBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( () => {
    console.log( "connected to database successfully" )
    SEEDNOW()
})
.catch( (err) => {
    console.log(err)
})

app.use( cors() ) // allow server(e.g nodeJs), communicate with the client 
    .use( morgan("tiny") )//log info about every http request
    .use( helmet() ) //helps to set http header
    .use( urlencoded({extended: false}) )
    .use( express.json() )
    .use( fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "/uploads")
    }) )
    .use( "*", cloudinary )

app.use("/vi/api", adminRoutes)
   

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}!`)
})