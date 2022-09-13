import Admin from "../models/admin.model"
import AccessAdmin from "../models/accessModel/adminaccess.model"
import { hashPassword } from "./helpers"

import {
    SEED_USER_FIRSTNAME,
    SEED_USER_LASTNAME,
    SEED_USER_PASSWORD,
    SEED_USER_ROLE,
    SEED_USER_EMAIL,
    SEED_USER_PHONE
} from "./config"

const payload: {
    firstname: string,
    lastname: string,
    password: string,
    role: string,
    email: string,
    phoneNo: string
 } = {
    firstname: SEED_USER_FIRSTNAME,
    lastname: SEED_USER_LASTNAME,
    password: SEED_USER_PASSWORD,
    role: SEED_USER_ROLE,
    email: SEED_USER_EMAIL,
    phoneNo: SEED_USER_PHONE
 }

 const {firstname, lastname, role, password, email, phoneNo} = payload 

export const SEEDNOW = async () => {

    try {
        const admin = await Admin.findOne()
        if (admin) return
        console.log("seeding now.....")
    
        const seedData = await new Admin({
            firstname,
            lastname,
            email,
            phoneNo,
            role
        }).save()

        await new AccessAdmin({
            adminId: seedData._id,
            password: hashPassword(password)
        }).save()

        console.log("seeding completed")
    } catch (err) {
        console.log( "for some reason we are unable to seed user" )
        return err
    }
    
 }