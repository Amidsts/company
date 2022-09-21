"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const access_1 = require("../middlewares/access");
const router = (0, express_1.Router)();
//unprotected route 
router.post("/signInAdmin", adminController_1.signinAdmin);
router.post("/forgotpassword", adminController_1.forgotPasssword);
router.post("/resendPasswordverificationCode", adminController_1.resendPasswordVerificationCode);
router.post("/passwordVerificationCode", adminController_1.enterpasswordverificationCode);
router.post("/resetPassword", adminController_1.resetpassword);
router.get("/about/:aboutId", adminController_1.getabout);
router.get("/abouts", adminController_1.getabouts);
router.post("/contact", adminController_1.addContact);
router.get("/getimage/:imgId", adminController_1.getimage);
router.get("/getimages", adminController_1.getimages);
//superAdmin access route
router.post("/signUpAdmin", access_1.authSuperAdmin, adminController_1.signUpAdmin);
router.delete("/deleteAdmin/:Id", access_1.authSuperAdmin, adminController_1.deleteAdmin);
router.get("/getAdmin/:Id", access_1.authSuperAdmin, adminController_1.GetAdmin);
//admin access route
router.post("/about", access_1.authAdmin, adminController_1.addAbout);
router.delete("/removeAbout/:Id", access_1.authAdmin, adminController_1.deleteabout);
router.put("/updateAbout/:aboutId", access_1.authAdmin, adminController_1.updateabout);
router.get("/getContacts", access_1.authAdmin, adminController_1.getcontacts);
router.post("/image", access_1.authAdmin, adminController_1.addimage);
router.put("/updateImage/:imgId", access_1.authAdmin, adminController_1.updateimage);
router.delete("/deleteImage/:imgId", access_1.authAdmin, adminController_1.removeImage);
exports.default = router;
/**
 *  "email": "gagagas@gmail.com",
    "Password": "J1g1jaga"
 */ 
