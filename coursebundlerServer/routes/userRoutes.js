import express from "express";
import {
    OtpVerification,
    addToPlaylist,
    changePassword,
    deleteMyProfile,
    deleteUser,
    forgetPassword,
    getAllUsers,
    getMyProfile,
    login,
    logout,
    mobilelogin,
    register,
    removeFromPlaylsit,
    resetPassword,
    updateProfile,
    updateProfilePicture,
    updateUserRole
} from "../controllers/userControllers.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
//to register a new user
router.route("/register")
    .post(singleUpload, register);

//Login
router.route("/login")
    .post(login);
//Mobile Login
router.route("/mobilelogin")
    .post(mobilelogin);
//Success Mobile Login
router.route("/mobilelogin/verify")
    .post(OtpVerification)

//Logout
router.route("/logout")
    .get(logout);

//Get my profile
router.route("/me")
    .get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/me")
    .delete(isAuthenticated, deleteMyProfile)

//Change Password
router.route("/changepassword")
    .put(isAuthenticated, changePassword);

//Update profile
router.route("/updateprofile")
    .put(isAuthenticated, updateProfile);

//Update Profile Picture // in 'cloudinary' wbsite
router.route("/updateprofilepicture")
    .put(isAuthenticated, singleUpload, updateProfilePicture);


//Forget Password
router.route("/forgetpassword")
    .post(forgetPassword);

//Reset Password // using 'maildrop' website 
router.route("/resetpassword/:token")
    .put(resetPassword);

//Add to playlist
router.route("/addtoplaylist")
    .post(isAuthenticated, addToPlaylist);

//Remove From PlayList
router.route("/removefromplaylist")
    .delete(isAuthenticated, removeFromPlaylsit)

// Admin Routes    
router.route("/admin/users")
    .get(isAuthenticated, authorizedAdmin, getAllUsers);

router.route("/admin/user/:id")
    .put(isAuthenticated, authorizedAdmin, updateUserRole)
    .delete(isAuthenticated, authorizedAdmin, deleteUser)


export default router; 