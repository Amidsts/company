
import {Schema, model, Types} from "mongoose"

export interface IGallery{
    name: string,
    title: string,
    image: {
        imageUrl: string,
        imageId: string
    }
}

const gallerySchema = new Schema({
    name: String,
    title: String,
    image: {
        imageUrl: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        }
    }
})

const Gallery = model<IGallery>("gallery", gallerySchema)

export default Gallery