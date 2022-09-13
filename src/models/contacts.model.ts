import {Schema, model} from "mongoose"

export interface IContact {
    address: string,
    email: string,
    phoneNo: string
}

const contactSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    }
})

const Contact = model<IContact>("contact", contactSchema)

export default Contact