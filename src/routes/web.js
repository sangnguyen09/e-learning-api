import express from 'express';
import {auth, home } from './../controllers/index'
 
let router = express.Router();

/**
 * Init all routes
 * @param app from exacly  express module
 */

let initROutes = (app) =>{
    router.get('/', home.getHome)
     router.get('/login-register',auth.getLoginRegister)
      return app.use('/',router)
}

module.exports = initROutes