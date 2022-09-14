"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    Image: [{
            imageUrl: String,
            imageId: String
        }],
    features: [{
            type: String,
            require: true
        }]
}, { timestamps: true });
const product = (0, mongoose_1.model)("product", productSchema);
exports.default = product;
