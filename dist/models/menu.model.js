"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    ImageUrl: [{
            type: String,
            default: ""
        }],
    features: [{
            type: String,
            require: true
        }]
}, { timestamps: true });
const Menu = (0, mongoose_1.model)("menu", menuSchema);
exports.default = Menu;
