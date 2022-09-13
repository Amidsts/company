import {Schema, model} from "mongoose"

export interface IGallery{
    image: {
        imageUrl: string,
        imageId: string
    },
    imageCategory?: string
}

const gallerySchema = new Schema({
    image: {
        imageUrl: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        }
    },
    imageCategory: {
        type: String
    }
})

const Gallery = model<IGallery>("gallery", gallerySchema)

export default Gallery