"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carouselSchema = new mongoose_1.Schema({
    carousel: [{
            text: {
                type: String,
                required: true
            },
            image: {
                imgUrl: String,
                imgId: String,
            }
        }]
}, { timestamps: true });
const Carousel = (0, mongoose_1.model)("carousel", carouselSchema);
exports.default = Carousel;
