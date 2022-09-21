"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDate = exports.generateVerificationCode = exports.cloudinary = exports.verifyToken = exports.generateToken = exports.checkHash = exports.hashPassword = exports.validate = exports.responseHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const cloudinary_1 = require("cloudinary");
const errors_1 = require("./errors");
const config_1 = require("./config");
const responseHandler = (payload, message = "success") => {
    return {
        success: true,
        message,
        data: payload || {}
    };
};
exports.responseHandler = responseHandler;
const validate = (schema, inputData) => {
    const validator = schema.validate(inputData);
    const { error, value } = validator;
    if (error) {
        console.log(error);
        throw new errors_1.badRequestError(`${value} ${error.message}`);
    }
    return value;
};
exports.validate = validate;
const hashPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const checkHash = (plainPassword, hashedPassword) => {
    return bcrypt_1.default.compareSync(plainPassword, hashedPassword);
};
exports.checkHash = checkHash;
function generateToken(payload) {
    const signInOptions = {
        // algorithm: 'RS256',
        expiresIn: 20000
    };
    // const privateKey = fs.readFileSync(path.join(__dirname, "../../private.key"))
    return (0, jsonwebtoken_1.sign)(payload, config_1.JWT_SECRET, signInOptions);
}
exports.generateToken = generateToken;
const verifyToken = (authorization) => {
    const [, token] = authorization.split("Bearer ");
    let decodedToken = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
    // console.log(decodedToken)
    return decodedToken;
};
exports.verifyToken = verifyToken;
//connect to cloudinary
const cloudinary = (_req, _res, next) => {
    cloudinary_1.v2.config({
        cloud_name: config_1.CLOUDINARY_NAME,
        api_key: config_1.CLOUDINARY_API_KEY,
        api_secret: config_1.CLOUDINARY_API_SECRET
    });
    next();
};
exports.cloudinary = cloudinary;
function generateVerificationCode() {
    let code = "abcdefghijl012345mnoprstuvwxyzOPRSTUVWXYZ6789ABCDEFGHIJKLMN";
    let str = "";
    for (let i = 0; i < 6; i++) {
        str += code[Math.floor(Math.random() * code.length)];
    }
    return str;
}
exports.generateVerificationCode = generateVerificationCode;
function printDate() {
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}
exports.printDate = printDate;
