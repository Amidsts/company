"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCarousel = exports.getImages = exports.getImage = exports.deleteImage = exports.updateImage = exports.addImage = exports.deleteContact = exports.getContact = exports.getContacts = exports.createContact = exports.getAbouts = exports.getAbout = exports.deleteAbout = exports.createAbout = exports.updateMenu = exports.getMenu = exports.removeMenu = exports.addProduct = exports.getAdmin = exports.removeAdmin = exports.signInAdmin = exports.createAdmin = void 0;
const cloudinary_1 = require("cloudinary");
const admin_model_1 = __importDefault(require("../models/admin.model"));
const adminaccess_model_1 = __importDefault(require("../models/accessModel/adminaccess.model"));
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
const validator_1 = require("../utils/validator");
const menu_model_1 = __importDefault(require("../models/menu.model"));
const about_model_1 = __importDefault(require("../models/about.model"));
const contacts_model_1 = __importDefault(require("../models/contacts.model"));
const gallery_model_1 = __importDefault(require("../models/gallery.model"));
const carousel_model_1 = __importDefault(require("../models/carousel.model"));
//admin
//add admin
function createAdmin(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstname, lastname, Password, email, phoneNo, imageUrl } = (0, validator_1.signUpAdminValidate)(payload);
        console.log(Password);
        try {
            const findAdmin = yield admin_model_1.default.find();
            if (findAdmin.length === 2)
                throw new errors_1.badRequestError("you cant add more than one admin");
            const adminExist = yield admin_model_1.default.findOne({ email });
            if (adminExist) {
                throw new errors_1.notFoundError("Admin already exist");
            }
            const admin = yield new admin_model_1.default({
                firstname,
                lastname,
                email,
                phoneNo,
                imageUrl
            }).save();
            yield new adminaccess_model_1.default({
                adminId: admin._id,
                password: (0, helpers_1.hashPassword)(Password)
            }).save();
            return admin;
        }
        catch (err) {
            return err;
        }
    });
}
exports.createAdmin = createAdmin;
function signInAdmin(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, Password } = (0, validator_1.signInAdminValidate)(payload);
        try {
            const adminExist = yield admin_model_1.default.findOne({ email });
            if (!adminExist) {
                throw new errors_1.notFoundError("invalid email or password");
            }
            const adminAccess = yield adminaccess_model_1.default.findOne({ adminId: adminExist._id });
            const comparePassword = (0, helpers_1.checkHash)(Password, adminAccess.password);
            if (!comparePassword) {
                throw new errors_1.notFoundError("invalid email or password");
            }
            //update isloggedIn to true
            const token = (0, helpers_1.generateToken)({
                role: adminExist.role,
                id: adminExist._id
            });
            return {
                accessToken: token,
                adminExist
            };
        }
        catch (err) {
            return err;
        }
    });
}
exports.signInAdmin = signInAdmin;
//delete admin
function removeAdmin(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const admin = yield admin_model_1.default.findById(id);
            if ((admin === null || admin === void 0 ? void 0 : admin.role) === "superAdmin")
                throw new errors_1.badRequestError("you cannot delete a super Admin");
            yield admin_model_1.default.deleteOne({ _id: id });
            yield adminaccess_model_1.default.deleteOne({ adminId: id });
            return "success";
        }
        catch (err) {
            return err;
        }
    });
}
exports.removeAdmin = removeAdmin;
//get admin
function getAdmin(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = yield admin_model_1.default.findById(id);
        if (!admin)
            throw new errors_1.notFoundError("admin account is not found");
        return admin;
    });
}
exports.getAdmin = getAdmin;
//add menu
function addProduct(imageFile, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, features } = (0, validator_1.menuValidate)(payload);
        try {
            const menu = yield new menu_model_1.default({
                name,
                description,
                features
            }).save();
        }
        catch (error) {
            return error;
        }
    });
}
exports.addProduct = addProduct;
//delete menu
function removeMenu(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteMenu = yield menu_model_1.default.findByIdAndDelete(id);
            if (!deleteMenu)
                throw new errors_1.notFoundError("menu not found");
            return {
                deletedMenu: deleteMenu
            };
        }
        catch (error) {
            return error;
        }
    });
}
exports.removeMenu = removeMenu;
//get menu
function getMenu(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menu = yield menu_model_1.default.findById(id);
            if (!menu)
                throw new errors_1.notFoundError("menu not found");
            return menu;
        }
        catch (error) {
            return error;
        }
    });
}
exports.getMenu = getMenu;
//update menu
function updateMenu(id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, features } = (0, validator_1.updateMenuValidate)(payload);
            const updatedMenu = yield menu_model_1.default.updateOne({ _id: id }, { $set: {
                    name,
                    description,
                    features
                } });
            if (!updatedMenu)
                throw new errors_1.notFoundError("menu not found");
            return updatedMenu;
        }
        catch (error) {
            return error;
        }
    });
}
exports.updateMenu = updateMenu;
//about
//create About
function createAbout(payload, imgfile) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description } = (0, validator_1.createAboutValidate)(payload);
        try {
            const img = yield cloudinary_1.v2.uploader.upload(imgfile.tempFilePath);
            if (!img)
                throw new errors_1.expectationFailedError("unable to upload image");
            return yield new about_model_1.default({
                title,
                description,
                image: {
                    imageUrl: (yield img).secure_url,
                    imageId: (yield img).public_id
                }
            }).save();
        }
        catch (error) {
            return error;
        }
    });
}
exports.createAbout = createAbout;
//delete about
function deleteAbout(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const about = yield about_model_1.default.findById({ _id: id });
            if (!about)
                throw new errors_1.notFoundError("about not found");
            yield cloudinary_1.v2.uploader.destroy(about.image.imageId);
            yield about_model_1.default.deleteOne({ _id: id });
            return {
                deleted: about
            };
        }
        catch (error) {
            return error;
        }
    });
}
exports.deleteAbout = deleteAbout;
//update about
/**export async function updateAbout(id:string, payload?: {[key: string]: string}, imgFile?: UploadedFile) {

    const {
        title,
        description
    } = updateAboutValidate(payload)
    try {
        const about = await About.findById(id)
    
        if (!about) throw new notFoundError("about not found")

        console.log(title)
    
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
                    }

                }
            })

            return "about updated successfully"

        } else {

            await about.update({
                $set: {
                    title: title || about.title,
                    description: description || about.description

                }
            })
            return "about updated successfully"
        }

       }catch(error) {
            return error
       }
}

*/
//get about
function getAbout(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield about_model_1.default.findById(id);
        }
        catch (error) {
            return error;
        }
    });
}
exports.getAbout = getAbout;
//get abouts
function getAbouts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield about_model_1.default.find().sort({ _id: -1 });
        }
        catch (error) {
            return error;
        }
    });
}
exports.getAbouts = getAbouts;
//contacts
function createContact(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address, email, phoneNo } = (0, validator_1.createContactValidate)(payload);
        try {
            console.log("addreaa");
            return yield new contacts_model_1.default({
                address,
                email,
                phoneNo
            }).save();
        }
        catch (error) {
            return error;
        }
    });
}
exports.createContact = createContact;
function getContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield contacts_model_1.default.find();
        }
        catch (error) {
            return error;
        }
    });
}
exports.getContacts = getContacts;
function getContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let contact = yield contacts_model_1.default.findById(id);
        if (!contact)
            throw new errors_1.notFoundError("contact not found");
        return contact;
    });
}
exports.getContact = getContact;
function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let contact = yield contacts_model_1.default.findById(id);
        if (!contact)
            throw new errors_1.notFoundError("contact not found");
        contact.delete();
        return "successful";
    });
}
exports.deleteContact = deleteContact;
//gallery
function addImage(imgFile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("good");
            const image = yield cloudinary_1.v2.uploader.upload(imgFile.tempFilePath);
            return yield new gallery_model_1.default({
                image: {
                    imageUrl: image.secure_url,
                    imageId: image.public_id
                }
            }).save();
        }
        catch (error) {
            return error;
        }
    });
}
exports.addImage = addImage;
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
function updateImage(imgId, imgFile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const img = yield gallery_model_1.default.findById(imgId);
            if (!img)
                throw new errors_1.notFoundError("image not found");
            yield cloudinary_1.v2.uploader.destroy(img.image.imageId);
            const image = yield cloudinary_1.v2.uploader.upload(imgFile.tempFilePath);
            img.update({
                $set: {
                    image: {
                        imageUrl: image.secure_url,
                        imageId: image.public_id
                    }
                }
            });
            return "image updated successfully";
        }
        catch (error) {
            return error;
        }
    });
}
exports.updateImage = updateImage;
function deleteImage(imgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getImage = yield gallery_model_1.default.findById(imgId);
            if (!getImage)
                throw new errors_1.notFoundError("image not found");
            yield cloudinary_1.v2.uploader.destroy(getImage.image.imageId);
            getImage.delete();
            return "image removed successfully";
        }
        catch (error) {
            return error;
        }
    });
}
exports.deleteImage = deleteImage;
function getImage(imgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const img = yield gallery_model_1.default.findById(imgId);
            if (!img)
                throw new errors_1.notFoundError("image not found");
            return img;
        }
        catch (error) {
            return error;
        }
    });
}
exports.getImage = getImage;
function getImages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield gallery_model_1.default.find();
        }
        catch (error) {
            return error;
        }
    });
}
exports.getImages = getImages;
//carousel
function createCarousel(carousel, imagefile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const carouselExist = yield carousel_model_1.default.findOne();
            (0, validator_1.createCarouseltValidate)(carousel).length;
            const image = yield cloudinary_1.v2.uploader.upload(imagefile.tempFilePath);
            // await new Carousel({
            //     carousel: 
            // })
        }
        catch (error) {
            return error;
        }
    });
}
exports.createCarousel = createCarousel;
//news
