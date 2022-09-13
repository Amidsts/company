import {Schema, Document, model} from "mongoose"

interface IProduct extends Document {
    name: string;
    description: string;
    image?: {
        imageUrl: string,
        imageId: string
    }[] ;
    features: string ;
}

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    Image: [{
        imageUrl: String,
        imageId: String
    }],
    features: [{
        type: String,
        require: true
    }]
}, {timestamps: true})

const product = model<IProduct>("product", productSchema)

export default product