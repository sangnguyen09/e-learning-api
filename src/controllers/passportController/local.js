import passport from "passport";
import passportLocal from "passport-local"; // kiêm tra đang nhập
import UserModel from '../../models/userModel'
import { transErrors, transSuccess } from "../../../lang/vi";

let localStratery = passportLocal.Strategy;

/**
 * Valid user account type: Local
 */

 let initPassportLocal =() =>{
     passport.use(new localStratery({
         usernameField:'email',
         passwordField:'password', // lay tu form name,
         passReqToCallback: true // goi ham callback
     }, async (req, email, password, done)=>{
        try {
            let user = await UserModel.findByEmail(email)
            if (!user) {
                return done(null,false,req.flash('errors',transErrors.login_failed))
            }
            if (!user.local.isActive) {
                return done(null,false,req.flash('errors',transErrors.account_not_active))
            }
            let checkPassword = await user.comparePassword(password)
            if (!checkPassword) {
                return done(null,false,req.flash('errors',transErrors.login_failed))
            }
            return done(null, user, req.flash('success', transSuccess.loginSuccess(user.username)))
        } catch (error) {
            return done(null, false, req.flash("errors", transErrors.server_error))
        }
     }))

     // luu userId vao session
     passport.serializeUser((user, done)=>{
        done(null, user._id)
     })
     passport.deserializeUser((id, done)=>{ // lay user tu session, duoc khai bao tu file server.js
        UserModel.findUserById(id)
        .then((user) => {
          return done(null, user)  
        }).catch((err) => {
            return done(err, nill)  
        });
     })
 }
 module.exports = initPassportLocal;