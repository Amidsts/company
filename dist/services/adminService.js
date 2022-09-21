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
exports.createCarousel = exports.getImages = exports.getImage = exports.deleteImage = exports.updateImage = exports.addImage = exports.deleteContact = exports.getContact = exports.getContacts = exports.createContact = exports.getAbouts = exports.getAbout = exports.updateAbout = exports.deleteAbout = exports.createAbout = exports.updateMenu = exports.getMenu = exports.removeMenu = exports.addProduct = exports.resetPassword = exports.enterPasswordVerificationCode = exports.resendpasswordverificationCode = exports.forgotPasswordVerificationCode = exports.getAdmin = exports.removeAdmin = exports.signInAdmin = exports.createAdmin = void 0;
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
const redis_1 = require("../utils/redis");
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
//forgot password
function forgotPasswordVerificationCode(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = (0, validator_1.forgotpasswordVerificatonValidate)(payload);
            const AdminExist = yield admin_model_1.default.findOne({ email: email });
            if (!AdminExist)
                throw new errors_1.notFoundError("admin account does not exist");
            const verificationCode = (0, helpers_1.generateVerificationCode)();
            yield (0, redis_1.SETEX)(`adminVerificationCode_${verificationCode}`, verificationCode);
            return {
                "verificationCode": verificationCode
            };
        }
        catch (error) {
            return error;
        }
    });
}
exports.forgotPasswordVerificationCode = forgotPasswordVerificationCode;
function resendpasswordverificationCode() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verificationCode = (0, helpers_1.generateVerificationCode)();
            yield (0, redis_1.SETEX)(`adminVerificationCode_${verificationCode}`, verificationCode);
            return {
                "verificationCode": verificationCode
            };
        }
        catch (error) {
            return error;
        }
    });
}
exports.resendpasswordverificationCode = resendpasswordverificationCode;
function enterPasswordVerificationCode(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code } = (0, validator_1.forgotpasswordVerificatonValidate)(payload);
            const getCode = yield (0, redis_1.GET)(`adminVerificationCode_${code}`);
            if (!getCode)
                throw new errors_1.notFoundError("verification code is incorrect");
            return "code validated";
        }
        catch (error) {
            return error;
        }
    });
}
exports.enterPasswordVerificationCode = enterPasswordVerificationCode;
//reset password
function resetPassword(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code, email, password, repeatPassword } = (0, validator_1.resetpasswordValidate)(payload);
            const admin = yield admin_model_1.default.findOne({ email });
            if (!admin)
                throw new errors_1.notFoundError("admin account not found");
            let adminAccess = yield adminaccess_model_1.default.findOne({ adminId: admin._id });
            if (!adminAccess)
                throw new errors_1.notFoundError("admin account not found");
            console.log(repeatPassword);
            adminAccess.password = (0, helpers_1.hashPassword)(repeatPassword);
            adminAccess.save();
        }
        catch (error) {
            return error;
        }
    });
}
exports.resetPassword = resetPassword;
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
        const { title, description, Type } = (0, validator_1.createAboutValidate)(payload);
        console.log((0, helpers_1.printDate)());
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
                },
                Type: Type,
                date: (0, helpers_1.printDate)()
            }).save();
        }
        catch (error) {
            return error;
        }
    });
}
exports.createAbout = createAbout;
//delete about
function deleteAbout(id, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const about = yield about_model_1.default.findOne({ _id: id, Type: type });
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
function updateAbout(id, payload, imgFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, Type } = (0, validator_1.updateAboutValidate)(payload);
        try {
            const about = yield about_model_1.default.findById(id);
            if (!about)
                throw new errors_1.notFoundError("about not found");
            if (imgFile) {
                yield cloudinary_1.v2.uploader.destroy(about.image.imageId);
                const newImage = yield cloudinary_1.v2.uploader.upload(imgFile.tempFilePath);
                yield about.update({
                    $set: {
                        title: title || about.title,
                        description: description || about.description,
                        image: {
                            imageUrl: newImage.secure_url,
                            imageId: newImage.public_id
                        },
                        Type: Type || about.Type
                    }
                });
                return "about updated successfully";
            }
            else {
                yield about.update({
                    $set: {
                        title: title || about.title,
                        description: description || about.description,
                        Type: Type || about.Type
                    }
                });
                return "about updated successfully";
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.updateAbout = updateAbout;
//get about
function getAbout(id, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield about_model_1.default.findOne({ _id: id, Type: type });
        }
        catch (error) {
            return error;
        }
    });
}
exports.getAbout = getAbout;
//get abouts
function getAbouts(type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield about_model_1.default.find({ Type: type }).sort({ _id: -1 });
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
function addImage(imgFile, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, title } = (0, validator_1.addImageValidate)(payload);
        try {
            const image = yield cloudinary_1.v2.uploader.upload(imgFile.tempFilePath);
            return yield new gallery_model_1.default({
                name,
                title,
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
function updateImage(imgId, imgFile, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, title } = (0, validator_1.updateImageValidate)(payload);
        try {
            const img = yield gallery_model_1.default.findById(imgId);
            if (!img)
                throw new errors_1.notFoundError("image not found");
            let image;
            if (imgFile) {
                yield cloudinary_1.v2.uploader.destroy(img.image.imageId);
                image = yield cloudinary_1.v2.uploader.upload(imgFile.tempFilePath);
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
