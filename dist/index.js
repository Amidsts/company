"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = require("mongoose");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./utils/config");
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const seed_1 = require("./utils/seed");
const helpers_1 = require("./utils/helpers");
const app = (0, express_1.default)();
(0, mongoose_1.connect)(config_1.DBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("connected to database successfully");
    (0, seed_1.SEEDNOW)();
})
    .catch((err) => {
    console.log(err);
});
app.use((0, cors_1.default)()) // allow server(e.g nodeJs), communicate with the client 
    .use((0, morgan_1.default)("tiny")) //log info about every http request
    .use((0, helmet_1.default)()) //helps to set http header
    .use((0, express_1.urlencoded)({ extended: false }))
    .use(express_1.default.json())
    .use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: path_1.default.join(__dirname, "/uploads")
}))
    .use("*", helpers_1.cloudinary);
app.use("/vi/api", admin_route_1.default);
app.listen(config_1.PORT, () => {
    console.log(`server is up and running on port ${config_1.PORT}!`);
});
