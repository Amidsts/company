import {Schema, model, Types} from "mongoose"

export interface IAdminAccess {
    adminId: Types.ObjectId,
    password: string
}

const adminAccessSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const AccessAdmin = model<IAdminAccess>("adminaccess", adminAccessSchema)

export default AccessAdmin