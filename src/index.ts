import express, { urlencoded } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import {connect} from "mongoose"
import fileUpload from "express-fileupload"
import path from "path"

import {
     PORT, DBURI,
     MONGODB_USER,
     MONGODB_PASSWORD,
     MONGODB_DATABASE
} from "./utils/config"
import adminRoutes from "./routes/admin.route"
import { SEEDNOW } from "./utils/seed"
import { cloudinary } from "./utils/helpers"
import {connectRedis} from "./utils/redis"

const app = express()
//'mongodb://MONGODB_USER:MONGODB_PASSWORD@mongodb:27017/MONGODB_DATABASE?retryWrites=true&w=majority&authSource=admin
connect('mongodb://mongodb:27017/mukefapi', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( () => {
    console.log("connected to database successfully") 
    SEEDNOW()
})
.catch( (err) => {
    console.log(err)
})

connectRedis() 

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