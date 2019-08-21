import passport from "passport";
import passportFacebook from "passport-facebook"; // kiêm tra đang nhập
import UserModel from '../../models/userModel'
import { transErrors, transSuccess } from "../../../lang/vi";

let facebookStratery = passportFacebook.Strategy;
let fbAppId = process.env.FB_APP_ID
let fbAppSecret = process.env.FB_APP_SECRET
let fbAppCallback = process.env.FB_APP_CALLBACK_URL
/**
 * Valid user account type: facebook
 */

 let initPassportFacebook =() =>{
     passport.use(new facebookStratery({
        clientID: fbAppId,
        clientSecret:fbAppSecret,
        callbackURL:fbAppCallback,
        profileFields:['email','gender', 'displayName'],
         passReqToCallback: true // goi ham callback
     }, async (req, accessToken, refeshToken,profile, done)=>{ // de dung tham so
        try {
            let user = await UserModel.findByFacebookUid(profile.id)
            if (user) {
                return done(null, user, req.flash('success', transSuccess.loginSuccess(user.username)))
            }
            let newUserItem ={
                username : profile.displayName,
                gender: profile.gender,
                local:{isActive:true},
                facebook:{
                    uid:profile.id,
                    token:accessToken,
                    email:profile.emails[0].value
                }
            };
            let newUser = await UserModel.createNew(newUserItem)
            return done(null, newUser, req.flash('success', transSuccess.loginSuccess(newUser.username)))
        } catch (error) {
            return done(null, false, req.flash("errors", transErrors.server_error))
        }
     }))

     // luu userId vao session
     passport.serializeUser((user, done)=>{
        done(null, user._id)
     })
     // ham nay duoc goi boi passport.session() , return userinfo to req.user
     passport.deserializeUser((id, done)=>{ // lay user tu session, duoc khai bao tu file server.js
        UserModel.findUserByIdForSessionToUse(id)
        .then((user) => {
          return done(null, user)
        }).catch((err) => {
            return done(err, nill)
        });
     })
 }
 module.exports = initPassportFacebook;
