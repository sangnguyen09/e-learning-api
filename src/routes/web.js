import express from "express";
import { auth, home } from "./../controllers/index";
import {authValid} from './../validation/index'
import passport from 'passport'
import initPassportLocal from '../controllers/passportController/local'

// init passport local
initPassportLocal()

let router = express.Router();

/**
 * Init all routes
 * @param app from exacly  express module
 */

let initROutes = app => {
 
  router.get("/login-register", auth.checkLoggedOut, auth.getLoginRegister);
  router.post("/register",auth.checkLoggedOut, authValid.register, auth.postRegister)// validate truowcs khi post du lieu leen
  router.get("/verify/:token",auth.checkLoggedOut,  auth.verifyAccount);

  router.post("/login",auth.checkLoggedOut, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:"/login-register",
    successFlash: true,
    failureFlash: true
  }))

  router.get("/",auth.checkLoggedIn, home.getHome);
  router.get('/logout',auth.checkLoggedIn, auth.getLogout)

  return app.use("/", router);
};

module.exports = initROutes;
