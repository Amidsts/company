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
exports.SEEDNOW = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const adminaccess_model_1 = __importDefault(require("../models/accessModel/adminaccess.model"));
const helpers_1 = require("./helpers");
const config_1 = require("./config");
const payload = {
    firstname: config_1.SEED_USER_FIRSTNAME,
    lastname: config_1.SEED_USER_LASTNAME,
    password: config_1.SEED_USER_PASSWORD,
    role: config_1.SEED_USER_ROLE,
    email: config_1.SEED_USER_EMAIL,
    phoneNo: config_1.SEED_USER_PHONE
};
const { firstname, lastname, role, password, email, phoneNo } = payload;
const SEEDNOW = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_model_1.default.findOne();
        if (admin)
            return;
        console.log("seeding now.....");
        const seedData = yield new admin_model_1.default({
            firstname,
            lastname,
            email,
            phoneNo,
            role
        }).save();
        yield new adminaccess_model_1.default({
            adminId: seedData._id,
            password: (0, helpers_1.hashPassword)(password)
        }).save();
        console.log("seeding completed");
    }
    catch (err) {
        console.log("for some reason we are unable to seed user");
        return err;
    }
});
exports.SEEDNOW = SEEDNOW;
