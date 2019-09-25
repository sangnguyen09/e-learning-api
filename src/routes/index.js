import express from "express";
import routerAuth from './authRoute'
import routerCourse from './courseRoute'
import routerUser from './userRoute'
import passport from "passport";

const router = express.Router();

router.use('/auth', routerAuth);
router.use('/course',passport.authenticate('jwt',{session:false, failWithError:true}), routerCourse);
router.use('/user', passport.authenticate('jwt',{session:false, failWithError:true}), routerUser);


export default router;
