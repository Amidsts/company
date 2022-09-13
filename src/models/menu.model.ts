import {Schema, Document, model} from "mongoose"

interface IMenu extends Document {
    name: string;
    description: string;
    imageUrl?: Array<string> ;
    features: string ;
}

const menuSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    ImageUrl: [{
        type: String,
        default: ""
    }],
    features: [{
        type: String,
        require: true
    }]
}, {timestamps: true})

const Menu = model<IMenu>("menu", menuSchema)

export default Menu