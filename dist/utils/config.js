"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_DATABASE = exports.MONGODB_PASSWORD = exports.MONGODB_USER = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_NAME = exports.JWT_SECRET = exports.SEED_USER_PHONE = exports.SEED_USER_EMAIL = exports.SEED_USER_ROLE = exports.SEED_USER_PASSWORD = exports.SEED_USER_LASTNAME = exports.SEED_USER_FIRSTNAME = exports.DBURI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { env } = process;
// export const PORT: string | number = env.PORT || 6000
exports.DBURI = env.dburi || "";
exports.SEED_USER_FIRSTNAME = env.seed_user_firstname || "";
exports.SEED_USER_LASTNAME = env.seed_user_lastname || "";
exports.SEED_USER_PASSWORD = env.seed_user_password || "";
exports.SEED_USER_ROLE = env.seed_user_role || "";
exports.SEED_USER_EMAIL = env.seed_user_email || "";
exports.SEED_USER_PHONE = env.seed_user_phone || "";
exports.JWT_SECRET = env.jwt_secret || "";
exports.CLOUDINARY_NAME = env.cloudinary_name || "";
exports.CLOUDINARY_API_KEY = env.cloudinary_API_key || "";
exports.CLOUDINARY_API_SECRET = env.cloudinary_API_secret || "";
exports.MONGODB_USER = env.mongodb_user || "";
exports.MONGODB_PASSWORD = env.mongodb_password || "";
exports.MONGODB_DATABASE = env.mongodb_database || "";
