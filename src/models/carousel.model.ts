
import {Schema, model, Document} from "mongoose"

interface ICarousel extends Document {
    carousel:{
        text: string,
        image: {
            imgUrl: string,
            imgId: string
        }
    }[]
}

const carouselSchema = new Schema({
    carousel: [{
        text: {
            type: String,
            required: true
        },
        image: {
            imgUrl: String,
            imgId: String,
        }
    }]
}, {timestamps: true})

const Carousel = model<ICarousel>("carousel", carouselSchema)

export default Carousel