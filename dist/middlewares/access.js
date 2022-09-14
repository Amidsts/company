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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdminAndSuperAdmin = exports.authAdmin = exports.authSuperAdmin = void 0;
const helpers_1 = require("../utils/helpers");
const errors_1 = require("../utils/errors");
const adminService_1 = require("../services/adminService");
const authSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.authorizationError("authorization token is invalid or has expired");
    }
    try {
        let { id } = yield (0, helpers_1.verifyToken)(authorization);
        req.id = id;
        const admin = yield (0, adminService_1.getAdmin)(req.id);
        if (admin.role != "superAdmin")
            throw new errors_1.authorizationError("you are not authorized");
        return next();
    }
    catch (err) {
        res.send(err);
    }
});
exports.authSuperAdmin = authSuperAdmin;
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.authorizationError("authorization token is invalid or has expired");
    }
    try {
        let { id } = yield (0, helpers_1.verifyToken)(authorization);
        req.id = id;
        const admin = yield (0, adminService_1.getAdmin)(req.id);
        if (admin.role != "admin")
            throw new errors_1.authorizationError("you are not authorized");
        return next();
    }
    catch (err) {
        res.send(err);
    }
});
exports.authAdmin = authAdmin;
const authAdminAndSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.authorizationError("authorization token is invalid or has expired");
    }
    try {
        let { id } = yield (0, helpers_1.verifyToken)(authorization);
        req.id = id;
        const admin = yield (0, adminService_1.getAdmin)(req.id);
        if (admin.role === "superadmin" || admin.role === "admin") {
            return next();
        }
        throw new errors_1.authorizationError("you are not authorized");
    }
    catch (err) {
        res.send(err);
    }
});
exports.authAdminAndSuperAdmin = authAdminAndSuperAdmin;
