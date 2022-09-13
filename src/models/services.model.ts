import {Schema, model} from "mongoose"

export interface IServices {
    name: string,
    description: string,
    imageUrls: Array<string>,
    features: Array<string>
}