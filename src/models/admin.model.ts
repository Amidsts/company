import {Schema, model, Types} from "mongoose"

export interface IAdmin {
    firstname: string;
    lastname: string;
    password: string;
    role: string;
    email: string;
    phoneNo: string;
    imageUrl?: string;
    isLoggedIn?: boolean ;
}

const adminSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "admin",
        required: false
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Admin = model<IAdmin>("admin", adminSchema)


export default Admin