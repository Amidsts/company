import dotenv from "dotenv"
import {connect, ConnectOptions} from "mongoose"

dotenv.config()
const {env} = process

export const PORT: string | number = env.PORT || 6000
export const DBURL: string = env.dburl || ""
export const SEED_USER_FIRSTNAME: string = env.seed_user_firstname || ""

export const SEED_USER_LASTNAME: string = env.seed_user_lastname || ""

export const SEED_USER_PASSWORD: string = env.seed_user_password || ""

export const SEED_USER_ROLE: string = env.seed_user_role || ""

export const SEED_USER_EMAIL: string = env.seed_user_email || ""

export const SEED_USER_PHONE: string = env.seed_user_phone || ""

export const JWT_SECRET: string = env.jwt_secret || ""

export const CLOUDINARY_NAME: string = env.cloudinary_name || ""
export const CLOUDINARY_API_KEY: string = env.cloudinary_API_key || ""

export const CLOUDINARY_API_SECRET: string = env.cloudinary_API_secret || ""
