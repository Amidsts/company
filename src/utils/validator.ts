import Joi, {object, string, number, boolean} from "joi"
import { validate } from "./helpers";

/*firstname: only letters, convert first letter to capital letter, no white space
password: must be alphanumeric not less than 6, not more than 20
phoneNo: must be number, not less than or greater than 11

*/
//admin
export const signUpAdminValidate = ( payload: {[key: string]: any} ) => {
    return validate( Joi.object({
        firstname: Joi.string().trim().required(),
        lastname: Joi.string().trim().required(),
        email: Joi.string().required(),
        phoneNo: Joi.string().required(),
        Password: Joi.string().min(6).max(20).required(),
        imageUrl: Joi.string()
        // role: string().valid("superAdmin", "admin"),
        
    }),
    payload )
}

export const signInAdminValidate = ( payload: {[key: string]: string} ) => {
    return validate( Joi.object({

        email: Joi.string().required(),
        Password: Joi.string().min(6).max(20).required()
        // isLoggedIn: Joi.boolean().required()
    }),
    payload )
}

export const updateAdminDetailsValidate = ( payload: {[key: string]: any} ) => {
    return validate( Joi.object({
        firstname: Joi.string().trim(),
        lastname: Joi.string().trim(),
        email: Joi.string(),
        phoneNo: Joi.string(),
        Password: Joi.string().min(6).max(20),
        imageUrl: Joi.string()
    }),
    payload )
}

//menu
export const menuValidate = ( payload: {[key: string]: any} ) => {
    return validate( Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        features: Joi.array().required()
    }),
    payload )
}

export const updateMenuValidate = ( payload: {[key: string]: any} ) => {
    return validate( Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        features: Joi.array()
    }),
    payload )
}

//about
export const createAboutValidate = ( payload: {[key: string]: any} ) => {
    return validate( Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required()
    }),
    payload )
}

export const updateAboutValidate = ( payload: {[key: string]: any} | undefined ) => {
    return validate( Joi.object({
        title: Joi.string().trim(),
        description: Joi.string().trim()
    }),
    payload )
}

//contact
export const createContactValidate = ( payload: {[key: string]: any} ) => {
    return validate( Joi.object({
        address: Joi.string().trim().required(),
        email: Joi.string().trim().required(),
        phoneNo: Joi.string().trim().required()
    }),
    payload )
}


//contact
export const createCarouseltValidate = ( payload: {[key: string]: any}[] ) => {
    return validate( Joi.array().items(
        Joi.object({
            text: Joi.string().trim().required(),
            image: Joi.object({
                
                    imgUrl: Joi.string().trim().required(),
                    imgId: Joi.string().trim().required()
            })
        })
    ), payload)
}