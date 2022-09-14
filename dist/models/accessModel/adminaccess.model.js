"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminAccessSchema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "admin"
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
const AccessAdmin = (0, mongoose_1.model)("adminaccess", adminAccessSchema);
exports.default = AccessAdmin;
