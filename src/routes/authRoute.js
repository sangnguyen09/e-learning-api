import express from "express";
import passport from "passport";
import {
	auth
} from "../controllers";
import {
	authValid
} from "../validation";

 import {initPassportLocal, loginLocalController} from '../controllers/passportController/local'
import { transErrors } from "../../lang/vi";
// // import initPassportFacebook from '../controllers/passportController/facebook'
// // import initPassportGoogle from '../controllers/passportController/google'
// import {initPassportJWT } from '../controllers/passportController/passportJWT'

// // init passport local,facebook
// initPassportLocal()
// // initPassportFacebook()
// // initPassportGoogle()
// initPassportJWT()


const router = express.Router();

router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister) // validate truowcs khi post du lieu leen

router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);// cái này dùng để verify email xác nhận

router.post("/refresh-token", authValid.refreshToken, auth.refreshToken);
router.post("/forgot-password", authValid.forgotPassword, auth.forgotPassword);
router.post("/reset-password", authValid.resetPassword, auth.resetPassword);

router.post("/get-user-info", passport.authenticate('jwt',{session:false, failWithError:true}),authValid.getUserInfo, auth.getUserInfo)


// login tai khoan local
router.post("/login", auth.checkLoggedOut, passport.authenticate('local', {failWithError:true , session:false}),loginLocalController)

// login tai khoan facebook
router.get("/facebook", auth.checkLoggedOut, passport.authenticate("facebook", {
	scope: ['email']
}));
router.get("facebook/callback", auth.checkLoggedOut, passport.authenticate("facebook", {
	successRedirect: '/',
	failureRedirect: "/login-register",
}));

// login tai khoan google
router.get("/google", auth.checkLoggedOut, passport.authenticate("google", {
	scope: ['email']
}));
router.get("/google/callback", auth.checkLoggedOut, passport.authenticate("google", {
	successRedirect: '/',
	failureRedirect: "/login-register",
}));


router.get('/logout', auth.checkLoggedIn, auth.getLogout)

export default router
