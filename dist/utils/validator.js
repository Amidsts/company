"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageValidate = exports.addImageValidate = exports.resetpasswordValidate = exports.forgotpasswordVerificatonValidate = exports.createCarouseltValidate = exports.createContactValidate = exports.updateAboutValidate = exports.createAboutValidate = exports.updateMenuValidate = exports.menuValidate = exports.updateAdminDetailsValidate = exports.signInAdminValidate = exports.signUpAdminValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("./helpers");
/*firstname: only letters, convert first letter to capital letter, no white space
password: must be alphanumeric not less than 6, not more than 20
phoneNo: must be number, not less than or greater than 11

*/
//admin
const signUpAdminValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        firstname: joi_1.default.string().trim().required(),
        lastname: joi_1.default.string().trim().required(),
        email: joi_1.default.string().required(),
        phoneNo: joi_1.default.string().required(),
        Password: joi_1.default.string().min(6).max(20).required(),
        imageUrl: joi_1.default.string()
        // role: string().valid("superAdmin", "admin"),
    }), payload);
};
exports.signUpAdminValidate = signUpAdminValidate;
const signInAdminValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        email: joi_1.default.string().required(),
        Password: joi_1.default.string().min(6).max(20).required()
        // isLoggedIn: Joi.boolean().required()
    }), payload);
};
exports.signInAdminValidate = signInAdminValidate;
const updateAdminDetailsValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        firstname: joi_1.default.string().trim(),
        lastname: joi_1.default.string().trim(),
        email: joi_1.default.string(),
        phoneNo: joi_1.default.string(),
        Password: joi_1.default.string().min(6).max(20),
        imageUrl: joi_1.default.string()
    }), payload);
};
exports.updateAdminDetailsValidate = updateAdminDetailsValidate;
//menu
const menuValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        name: joi_1.default.string().trim().required(),
        description: joi_1.default.string().trim().required(),
        features: joi_1.default.array().required()
    }), payload);
};
exports.menuValidate = menuValidate;
const updateMenuValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        name: joi_1.default.string().trim(),
        description: joi_1.default.string().trim(),
        features: joi_1.default.array()
    }), payload);
};
exports.updateMenuValidate = updateMenuValidate;
//about
const createAboutValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        title: joi_1.default.string().trim().required(),
        description: joi_1.default.string().trim().required(),
        Type: joi_1.default.string().valid("carousel", "about", "news").required()
    }), payload);
};
exports.createAboutValidate = createAboutValidate;
const updateAboutValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        title: joi_1.default.string().trim(),
        description: joi_1.default.string().trim(),
        Type: joi_1.default.string().valid("carousel", "about", "news")
    }), payload);
};
exports.updateAboutValidate = updateAboutValidate;
//contact
const createContactValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        address: joi_1.default.string().trim().required(),
        email: joi_1.default.string().trim().required(),
        phoneNo: joi_1.default.string().trim().required()
    }), payload);
};
exports.createContactValidate = createContactValidate;
//contact
const createCarouseltValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.array().items(joi_1.default.object({
        text: joi_1.default.string().trim().required(),
        image: joi_1.default.object({
            imgUrl: joi_1.default.string().trim().required(),
            imgId: joi_1.default.string().trim().required()
        })
    })), payload);
};
exports.createCarouseltValidate = createCarouseltValidate;
//forgot password verification
const forgotpasswordVerificatonValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        email: joi_1.default.string().trim(),
        code: joi_1.default.string().length(6)
    }), payload);
};
exports.forgotpasswordVerificatonValidate = forgotpasswordVerificatonValidate;
const resetpasswordValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        email: joi_1.default.string().trim().required(),
        code: joi_1.default.string().length(6).required(),
        password: joi_1.default.string().trim().required(),
        repeatPassword: joi_1.default.ref('password')
    }), payload);
};
exports.resetpasswordValidate = resetpasswordValidate;
//gallery
const addImageValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        name: joi_1.default.string().trim().required(),
        title: joi_1.default.string().trim().required()
    }), payload);
};
exports.addImageValidate = addImageValidate;
const updateImageValidate = (payload) => {
    return (0, helpers_1.validate)(joi_1.default.object({
        name: joi_1.default.string().trim(),
        title: joi_1.default.string().trim()
    }), payload);
};
exports.updateImageValidate = updateImageValidate;
