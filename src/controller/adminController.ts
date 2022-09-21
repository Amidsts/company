import { NextFunction, Request, Response } from "express"

import {
    createAbout,
    createAdmin,
    deleteAbout,
    getAbout,
    getAbouts,
    getAdmin,
    removeAdmin,
    signInAdmin,
    addImage,
    createContact,
    updateImage,
    deleteImage,
    getImage,
    getImages,
    getContacts,
    forgotPasswordVerificationCode,
    resendpasswordverificationCode,
    enterPasswordVerificationCode,
    resetPassword,
    updateAbout
} from "../services/adminService"
import { expectationFailedError } from "../utils/errors"
import { responseHandler } from "../utils/helpers"



export async function signUpAdmin (req: Request, res: Response, next: NextFunction) {
    try{

        const response = await createAdmin(req.body)
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function signinAdmin (req: Request, res: Response, next: NextFunction) {
    try{

        const response = await signInAdmin(req.body)
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function deleteAdmin (req, res: Response, next: NextFunction) {
    try{

        const response = await removeAdmin(req.params.Id)
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

// export async function updateDetails (req, res: Response, next: NextFunction) {
//     try{

//         const response = await updateAdminDetails(req.id, req.body)
//         res.json(responseHandler(response))
//     } catch (err) {
//         res.json(err)
//         next(err)
//     }
// }

export async function GetAdmin (req, res: Response, next: NextFunction) {
    try{

        const response = await getAdmin(req.params.Id)
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}


//about 

export async function addAbout (req, res: Response, next: NextFunction) {
    try{
        if (!req.files) throw new expectationFailedError("select a file")

        const response = await createAbout(req.body, req.files.img)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function deleteabout (req, res: Response, next: NextFunction) {
    try{

        const response = await deleteAbout(req.params.Id, req.query.aboutType)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function updateabout (req, res: Response, next: NextFunction) {
    try{

        if (!req.file) {
            const response = await updateAbout(req.params.aboutId, req.body)
            res.json(responseHandler(response))
        } else if ( !req.body ) {
            const response = await updateAbout(req.params.aboutId, undefined, req.files.img)
            res.json(responseHandler(response))
        }
        
        const response = await updateAbout(req.params.aboutId, req.body, req.files.img)
        res.json(responseHandler(response))

    } catch (err) {
        res.json(err)
        next(err)
    }
}


export async function getabout (req, res: Response, next: NextFunction) {
    try{

        const response = await getAbout(req.params.aboutId, req.query.aboutType)
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function getabouts (req, res: Response, next: NextFunction) {
    try{

        const response = await getAbouts(req.query.aboutType)
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

//contacts
export async function addContact (req, res: Response, next: NextFunction) {
    try{

        const response = await createContact(req.body)
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function getcontacts (req, res: Response, next: NextFunction) {
    try{

        const response = await getContacts()
        res.json(responseHandler(response))
    } catch (err) {
        res.json(err) 
        next(err)
    }
}

//gallery
// export async function addimages(req, res: Response, next: NextFunction) {
//     try{
//         const response = await addImages(req.files)

//         res.json(responseHandler(response))
//     } catch (err) {
//         res.json(err)
//         next(err)
//     }
// }

export async function addimage(req, res: Response, next: NextFunction) {
    try{
        const response = await addImage(req.files.img, req.body)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function updateimage(req, res: Response, next: NextFunction) {
    try{
        const response = await updateImage(req.params.imgId,req.files.img, req.body)

        res.json(responseHandler(response))
    } catch (err) { 
        res.json(err)
        next(err)
    }
}

export async function removeImage(req, res: Response, next: NextFunction) {
    try{
        const response = await deleteImage(req.params.imgId)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function getimage(req, res: Response, next: NextFunction) {
    try{
        const response = await getImage(req.params.imgId)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function getimages(req, res: Response, next: NextFunction) {
    try{
        const response = await getImages()

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function forgotPasssword(req, res: Response, next: NextFunction) {
    try{
        const response = await forgotPasswordVerificationCode(req.body)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function resendPasswordVerificationCode(req, res: Response, next: NextFunction) {
    try{
        const response = await resendpasswordverificationCode()

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function enterpasswordverificationCode(req, res: Response, next: NextFunction) {
    try{
        const response = await enterPasswordVerificationCode(req.body)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}

export async function resetpassword(req, res: Response, next: NextFunction) {
    try{
        const response = await resetPassword(req.body)

        res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
}