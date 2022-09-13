import {Schema, model, Types} from "mongoose"

export interface INews {
    adminId: string,
    title: string,
    status: "active" | "inactive",
    content: string,
    dateModified: Date,
}

const newSchema = new Schema({

})