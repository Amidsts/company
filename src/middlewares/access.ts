import {sign, verify, SignOptions} from  "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

import { verifyToken } from "../utils/helpers"
import { authorizationError } from "../utils/errors"
import { getAdmin } from "../services/adminService"


export const authSuperAdmin = async(req, res:Response, next: NextFunction ) => {

    const {authorization} = req.headers
    if (!authorization) {
        throw new authorizationError("authorization token is invalid or has expired")
    }
    try {  
        
         let { id} = await verifyToken(authorization)

         req.id = id

         const admin = await getAdmin(req.id)

         if ( admin.role != "superAdmin" ) throw new authorizationError( "you are not authorized" ) 

         return next() 
    } catch (err) {
        res.send(err)

    }
}

export const authAdmin = async(req, res:Response, next: NextFunction ) => {

    const {authorization} = req.headers
    if (!authorization) {
        throw new authorizationError("authorization token is invalid or has expired")
    }
    try {
        
         let { id} = await verifyToken(authorization)
         
         req.id = id

         const admin = await getAdmin(req.id)

         if (admin.role != "admin") throw new authorizationError("you are not authorized")

         return next()
    } catch (err) {
        res.send(err)
    }
}

export const authAdminAndSuperAdmin = async(req, res:Response, next: NextFunction ) => {

    const {authorization} = req.headers
    if (!authorization) {
        throw new authorizationError("authorization token is invalid or has expired")
    }
    try {
        
         let { id} = await verifyToken(authorization)
         
         req.id = id

         const admin = await getAdmin(req.id)

         if (admin.role === "superadmin" || admin.role === "admin" ) {
            return next()
         }
         
         
         throw new authorizationError("you are not authorized")
         
    } catch (err) {
        res.send(err)
    }
}