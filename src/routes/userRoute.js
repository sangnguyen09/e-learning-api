import express from "express";
import { auth, user } from "../controllers";
import { userValid } from "../validation";

const router = express.Router();
	
router.put('/update-avatar', auth.checkLoggedIn, user.updateAvatar)
router.put('/update-info', auth.checkLoggedIn, userValid.updateInfo, user.updateInfo)
router.put('/update-password', auth.checkLoggedIn, userValid.updatePassword, user.updatePassword)

export default router