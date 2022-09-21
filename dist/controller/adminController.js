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
exports.resetpassword = exports.enterpasswordverificationCode = exports.resendPasswordVerificationCode = exports.forgotPasssword = exports.getimages = exports.getimage = exports.removeImage = exports.updateimage = exports.addimage = exports.getcontacts = exports.addContact = exports.getabouts = exports.getabout = exports.updateabout = exports.deleteabout = exports.addAbout = exports.GetAdmin = exports.deleteAdmin = exports.signinAdmin = exports.signUpAdmin = void 0;
const adminService_1 = require("../services/adminService");
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
function signUpAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.createAdmin)(req.body);
            return res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.signUpAdmin = signUpAdmin;
function signinAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.signInAdmin)(req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.signinAdmin = signinAdmin;
function deleteAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.removeAdmin)(req.params.Id);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.deleteAdmin = deleteAdmin;
// export async function updateDetails (req, res: Response, next: NextFunction) {
//     try{
//         const response = await updateAdminDetails(req.id, req.body)
//         res.json(responseHandler(response))
//     } catch (err) {
//         res.json(err)
//         next(err)
//     }
// }
function GetAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.getAdmin)(req.params.Id);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.GetAdmin = GetAdmin;
//about 
function addAbout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.files)
                throw new errors_1.expectationFailedError("select a file");
            const response = yield (0, adminService_1.createAbout)(req.body, req.files.img);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.addAbout = addAbout;
function deleteabout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.deleteAbout)(req.params.Id, req.query.aboutType);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.deleteabout = deleteabout;
function updateabout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.file) {
                const response = yield (0, adminService_1.updateAbout)(req.params.aboutId, req.body);
                res.json((0, helpers_1.responseHandler)(response));
            }
            else if (!req.body) {
                const response = yield (0, adminService_1.updateAbout)(req.params.aboutId, undefined, req.files.img);
                res.json((0, helpers_1.responseHandler)(response));
            }
            const response = yield (0, adminService_1.updateAbout)(req.params.aboutId, req.body, req.files.img);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.updateabout = updateabout;
function getabout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.getAbout)(req.params.aboutId, req.query.aboutType);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.getabout = getabout;
function getabouts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.getAbouts)(req.query.aboutType);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.getabouts = getabouts;
//contacts
function addContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.createContact)(req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.addContact = addContact;
function getcontacts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.getContacts)();
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.getcontacts = getcontacts;
//gallery
// export async function addimages(req, res: Response, next: NextFunction) {
//     try{
//         const response = await addImages(req.files)
//         res.json(responseHandler(response))
//     } catch (err) {
//         res.json(err)
//         next(err)
//     }
// }
function addimage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.addImage)(req.files.img, req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.addimage = addimage;
function updateimage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.updateImage)(req.params.imgId, req.files.img, req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.updateimage = updateimage;
function removeImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.deleteImage)(req.params.imgId);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.removeImage = removeImage;
function getimage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.getImage)(req.params.imgId);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.getimage = getimage;
function getimages(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.getImages)();
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.getimages = getimages;
function forgotPasssword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.forgotPasswordVerificationCode)(req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.forgotPasssword = forgotPasssword;
function resendPasswordVerificationCode(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.resendpasswordverificationCode)();
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.resendPasswordVerificationCode = resendPasswordVerificationCode;
function enterpasswordverificationCode(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.enterPasswordVerificationCode)(req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.enterpasswordverificationCode = enterpasswordverificationCode;
function resetpassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, adminService_1.resetPassword)(req.body);
            res.json((0, helpers_1.responseHandler)(response));
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    });
}
exports.resetpassword = resetpassword;
