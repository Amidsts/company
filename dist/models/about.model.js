"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aboutSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        imageUrl: String,
        imageId: String
    }
}, { timestamps: true });
const About = (0, mongoose_1.model)("about", aboutSchema);
exports.default = About;
