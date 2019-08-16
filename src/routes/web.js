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
  router.get("/", home.getHome);
  router.get("/login-register", auth.getLoginRegister);
  router.post("/register",authValid.register, auth.postRegister)// validate truowcs khi post du lieu leen
  router.get("/verify/:token", auth.verifyAccount);

  router.post("/login", passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:"/login-register",
    successFlash: true,
    failureFlash: true
  }))

  return app.use("/", router);
};

module.exports = initROutes;
