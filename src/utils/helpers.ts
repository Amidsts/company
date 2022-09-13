import bcrypt from "bcrypt"
import {verify, VerifyOptions, sign, SignOptions, Secret} from "jsonwebtoken"
import fs from "fs"
import path from "path"
import { v2 } from "cloudinary"
import { NextFunction } from "express"

import { badRequestError } from "./errors"
import { 
    JWT_SECRET,
    CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME
} from "./config"


export const responseHandler = (payload: any, message = "success"): any => {
    return {
        success: true,
        message,
        data : payload || {}
    }
}

export const validate = (schema: { [key: string]: any } | any, inputData: { [key: string]: any } | any) => {

    const validator =  schema.validate( inputData )

    const { error, value } = validator
    
    if (error) {
        console.log( error )
        throw new badRequestError( `${value} ${error.message}` )
    }

    return value
}

export const hashPassword = ( password: string ) => {
   
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
 }

 export const checkHash = (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
 }

export function generateToken (payload: {[key: string]: any }) {

    const signInOptions: SignOptions = {
        // algorithm: 'RS256',
        expiresIn : 20000
    }
    // const privateKey = fs.readFileSync(path.join(__dirname, "../../private.key"))

    return sign(payload,JWT_SECRET, signInOptions)
}

interface TokenPayload {
    id: string; 
}

export const verifyToken = (authorization: string) => {

    const [ , token] = authorization.split("Bearer ")

    let decodedToken = verify( token, JWT_SECRET ) as TokenPayload
    // console.log(decodedToken)
    return decodedToken
}

//connect to cloudinary
export const cloudinary = (_req, _res, next: NextFunction) => {

    v2.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    })
    next()
}