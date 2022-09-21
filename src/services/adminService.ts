import { UploadedFile } from "express-fileupload"
import {UploadResponseCallback, v2} from "cloudinary"

import Admin, { IAdmin } from "../models/admin.model"
import AccessAdmin from "../models/accessModel/adminaccess.model"
import { authorizationError, badRequestError, expectationFailedError, notFoundError } from "../utils/errors"
import { checkHash, generateToken, generateVerificationCode, hashPassword, printDate } from "../utils/helpers"
import {
    signUpAdminValidate,
    signInAdminValidate,
    updateAdminDetailsValidate,
    menuValidate,
    updateMenuValidate,
    createAboutValidate,
    updateAboutValidate,
    createContactValidate,
    createCarouseltValidate,
    forgotpasswordVerificatonValidate,
    resetpasswordValidate,
    addImageValidate,
    updateImageValidate
} from "../utils/validator"
import Menu from "../models/menu.model"
import About from "../models/about.model"
import Contact from "../models/contacts.model"
import Gallery, { IGallery } from "../models/gallery.model"
import Carousel from "../models/carousel.model"
import { SETEX, GET } from "../utils/redis"


//admin
//add admin
export async function createAdmin( payload: {[key: string]: any} ) {
    const {
        firstname,
        lastname,
        Password,
        email,
        phoneNo,
        imageUrl
    } = signUpAdminValidate(payload)
    console.log( Password )

    try {
        const findAdmin = await Admin.find() 

        if ( findAdmin.length === 2 ) throw new badRequestError("you cant add more than one admin")

        const adminExist = await Admin.findOne({email})

        if (adminExist) {
            throw new notFoundError("Admin already exist")
        }
  
        const admin = await new Admin({
            firstname,
            lastname,
            email,
            phoneNo,
            imageUrl
        }).save()

        await new AccessAdmin({
            adminId: admin._id,
            password: hashPassword(Password)
        }).save()

        return admin
    } catch (err) {
        return err 
    }

}

export async function signInAdmin ( payload : { [key: string]: any} ) { 
    const {
        email,
        Password
    } = signInAdminValidate(payload)

    try {

        const adminExist = await Admin.findOne({ email })

        if ( !adminExist ) {
            throw new notFoundError("invalid email or password")
        }
        const adminAccess = await AccessAdmin.findOne( {adminId: adminExist._id } ) 
    
    
        const comparePassword = checkHash(Password, adminAccess!.password)
    
        if (!comparePassword) {
            throw new notFoundError("invalid email or password")
        }
    
        //update isloggedIn to true
    
        const token = generateToken({ 
            role: adminExist.role,
            id: adminExist._id
        })
        
        return {
            accessToken: token,
            adminExist
        } 
    } catch (err) {
        return err
    }

}

//delete admin
export async function removeAdmin(id: string) {
    try{
        const admin = await Admin.findById(id)

        if (admin?.role === "superAdmin") throw new badRequestError("you cannot delete a super Admin")
    
        await Admin.deleteOne({_id: id})
    
        await AccessAdmin.deleteOne({adminId: id})
    
        return "success"
    } catch (err) {
        return err
    }

 
}

//get admin
export async function getAdmin (id: string) {
    const admin = await Admin.findById(id)
    if (!admin) throw new notFoundError("admin account is not found")

    return admin
}

//forgot password
export async function forgotPasswordVerificationCode (payload: { [key: string]: any }) {
    try {
        const {email} = forgotpasswordVerificatonValidate(payload)

        const AdminExist = await Admin.findOne({ email: email})

         if(!AdminExist) throw new notFoundError("admin account does not exist")

        const verificationCode = generateVerificationCode()

        await SETEX(`adminVerificationCode_${verificationCode}`, verificationCode)

        return {
            "verificationCode": verificationCode
        }
    } catch(error) {
        return error
    }
    
}

export async function resendpasswordverificationCode () {
    try{
        const verificationCode = generateVerificationCode()

        await SETEX(`adminVerificationCode_${verificationCode}`, verificationCode)

        return {
            "verificationCode": verificationCode
        }
    } catch(error) {
        return error
    }
}

export async function enterPasswordVerificationCode (payload: {[key: string]: any}) {
    try {
        const {code} = forgotpasswordVerificatonValidate(payload)

        const getCode = await GET(`adminVerificationCode_${code}`) 

        if ( !getCode ) throw new notFoundError("verification code is incorrect")

        return "code validated"
    } catch(error) {
        return error
    }
}

//reset password
export async function resetPassword (payload: {[key: string]: any}) {
    try {
        const { code, email, password, repeatPassword } = resetpasswordValidate(payload)

        const admin = await Admin.findOne({email})
        if (!admin) throw new notFoundError("admin account not found")

        let adminAccess = await AccessAdmin.findOne({adminId: admin._id})

        if (!adminAccess) throw new notFoundError("admin account not found")

        console.log(repeatPassword)
        adminAccess.password = hashPassword(repeatPassword )

        adminAccess.save()
        
    } catch(error) {
        return error
    }
}

//add menu
export async function addProduct (imageFile: UploadedFile, payload : {[key: string]: any}) {
    const { 
        name, 
        description, 
        features 
    } = menuValidate(payload)

    try {

       const menu = await new Menu({
        name,
        description,
        features
       }).save()

    }catch(error) {
        return error
    }
}

//delete menu
export async function removeMenu (id: string) {
    try{
        const deleteMenu = await Menu.findByIdAndDelete(id)

        if (!deleteMenu) throw new notFoundError("menu not found")

        return {
            deletedMenu: deleteMenu
        }
    }catch(error) {
        return error
    }
}

//get menu
export async function getMenu (id) {
    try{
        const menu = await Menu.findById(id)

        if (!menu) throw new notFoundError("menu not found")

        return menu
    }catch(error) {
        return error
    }
}

//update menu
export async function updateMenu (id, payload:{[key: string]: any}) {
    try{

        const { 
            name, 
            description, 
            features 
        } = updateMenuValidate(payload)

        const updatedMenu = await Menu.updateOne(
            {_id: id},
            { $set: {
                name,
                description,
                features
            }}
        )

        if (!updatedMenu) throw new notFoundError("menu not found")

        return updatedMenu

    }catch(error) {
        return error
    }
}


//about
//create About

export async function createAbout (payload: {[key: string]: string}, imgfile: UploadedFile, ) {

    const { 
        title, 
        description,
        Type
    } = createAboutValidate(payload)
    console.log( printDate() )
    try {
        const img = await v2.uploader.upload(imgfile.tempFilePath)
        if( !img ) throw new expectationFailedError("unable to upload image")
        
       return await new About({
            title,
            description,
            image: {
                imageUrl: (await img).secure_url,
                imageId: (await img).public_id
            },
            Type: Type,
            date: printDate()
        }).save()
    }catch(error) {
        return error
    }
    
}

//delete about
export async function deleteAbout(id: string, type: string) {
   try {
    const about = await About.findOne({_id: id, Type: type })

    if (!about) throw new notFoundError("about not found") 

    await v2.uploader.destroy(about.image.imageId)

    await About.deleteOne({_id: id})

    return{
        deleted: about
    }
   }catch(error) {
        return error
   }
}

//update about
export async function updateAbout(id:string, payload?: {[key: string]: string}, imgFile?: UploadedFile) {

    const {
        title, 
        description,
        Type
    } = updateAboutValidate(payload)
    try {
        const about = await About.findById(id)
    
        if (!about) throw new notFoundError("about not found") 
    
        if (imgFile) {
            await v2.uploader.destroy(about.image.imageId)
        
            const newImage = await v2.uploader.upload(imgFile.tempFilePath)

            await about.update({
                $set: {
                    title: title || about.title,
                    description: description || about.description,
                    image: {
                        imageUrl: newImage.secure_url,
                        imageId: newImage.public_id
                    },
                    Type: Type || about.Type

                }
            })

            return "about updated successfully"

        } else {

            await about.update({
                $set: {
                    title: title || about.title,
                    description: description || about.description,
                    Type: Type || about.Type
                }
            })
            return "about updated successfully"
        }

       }catch(error) {
            return error
       }
}


//get about

export async function getAbout(id: string, type: string) {
    try {
        return await About.findOne({_id:id, Type: type })
    }catch(error) {
        return error
   }
    
}

//get abouts

export async function getAbouts(type: string) {
    try {
        return await About.find({Type: type}).sort({_id: -1})
    }catch(error) {
        return error
   }
    
}

//contacts
export async function createContact(payload: {[key: string]: string}) {
    const {
        address, 
        email, 
        phoneNo
    } = createContactValidate(payload)

   try{
    console.log("addreaa")
        return await new Contact({
            address,
            email,
            phoneNo
        }).save()
   }catch(error) {
        return error
   }
}

export async function getContacts() {
    try {
        return await Contact.find()
    }catch(error) {
        return error
   }
   
}

export async function getContact (id: string) {
    let contact = await Contact.findById(id)

    if ( !contact ) throw new notFoundError("contact not found")

    return contact
}

export async function deleteContact (id) {
    let contact = await Contact.findById(id)

    if ( !contact ) throw new notFoundError("contact not found")

    contact.delete()

    return "successful"
}

//gallery
export async function addImage (imgFile: UploadedFile, payload: {[key : string]: string}) {

    const {name, title} = addImageValidate(payload)
    try {

        const image = await v2.uploader.upload(imgFile.tempFilePath)
        
        return await new Gallery({
            name,
            title,
            image: {
                imageUrl: image.secure_url,
                imageId: image.public_id
            }
        }).save()
    }catch(error) {
        return error
   }
}

// export async function addImages (images: Record<string, UploadedFile>) {

//     try {
//         let img = Object.keys(images)
//         // console.log("all fields",img)
    
//         let galleryArr : Array<IGallery> = []

//         img.forEach( async (e: unknown) => {
//             let imgFile = e as UploadedFile
//             console.log("each",e)
//             let uploadedImage = await v2.uploader.upload(imgFile.tempFilePath)

//             console.log("upload",uploadedImage)

//             return galleryArr.push( {
//                 image: {
//                     imageUrl: uploadedImage.secure_url,
//                     imageId: uploadedImage.public_id
//                 }
//             } )

//         })

//         // console.log("gallery", galleryArr)

//     }catch(error) {
//         return error
//    }


// //     console.log("gallery", galleryArr)

// //    return await Gallery.insertMany(galleryArr)
// }

export async function updateImage (imgId: string, imgFile: UploadedFile, payload: {[key: string]: string} ) {
    const {name, title} = updateImageValidate(payload)
    try {
      const img = await Gallery.findById(imgId)

      if ( !img ) throw new notFoundError("image not found")

      let image ;
      if ( imgFile ) {
        await v2.uploader.destroy(img.image.imageId)

        image = await v2.uploader.upload(imgFile.tempFilePath)
      }
 

      img.update({
        $set: {
            name: name || img.name,
            title: title || img.title,
            image: {
                imageUrl: image.secure_url,
                imageId: image.public_id
            } || {
                imageUrl: img.image.imageUrl,
                imageId: img.image.imageId
            }
        }
      })
      
      return "image updated successfully"
    }catch(error) {
        return error
   }
}

export async function deleteImage (imgId) {
    try {
        const getImage = await Gallery.findById(imgId)

        if ( !getImage ) throw new notFoundError("image not found")

        await v2.uploader.destroy( getImage.image.imageId )

        getImage.delete()

        return "image removed successfully"
    }catch(error) {
        return error
   }
}

export async function getImage (imgId: string) {
    try {
        const img = await Gallery.findById(imgId)

        if (!img) throw new notFoundError("image not found")
        
        return img
    }catch(error) {
        return error
   }
}

export async function getImages () {
    try {
      return await Gallery.find() ;

    }catch(error) {
        return error
   }
}

//carousel
export async function createCarousel (carousel: {[key: string]: any }[], imagefile: UploadedFile) {
    try {
        const carouselExist =await Carousel.findOne()
        
        createCarouseltValidate(carousel).length

        const image =await v2.uploader.upload(imagefile.tempFilePath)

        // await new Carousel({
        //     carousel: 
        // })
        
      }catch(error) {
          return error
     }
}
//news