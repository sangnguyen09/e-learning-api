import express from "express";
import { auth, home } from "./../controllers/index";
import {authValid} from './../validation/index'

let router = express.Router();

/**
 * Init all routes
 * @param app from exacly  express module
 */

let initROutes = app => {
  router.get("/", home.getHome);
  router.get("/login-register", auth.getLoginRegister);
  router.post("/register",authValid.register, auth.postRegister)// validate truowcs khi post du lieu leen

  return app.use("/", router);
};

module.exports = initROutes;
