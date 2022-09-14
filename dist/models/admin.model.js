"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "admin",
        required: false
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const Admin = (0, mongoose_1.model)("admin", adminSchema);
exports.default = Admin;
