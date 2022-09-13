import { string } from "joi"
import {Schema, model} from "mongoose"

export interface IAbout {
    title: string,
    description: string,
    image: {
        imageUrl: string,
        imageId: string
    }
}

const aboutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        imageUrl: String,
        imageId: String
    }
},  {timestamps: true})

const About = model<IAbout>("about", aboutSchema)

export default About