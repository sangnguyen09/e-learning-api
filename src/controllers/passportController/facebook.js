import passport from "passport";
import passportFacebook from "passport-facebook"; // kiêm tra đang nhập
import UserModel from '../../models/userModel'
import ChatGroupModel from '../../models/chatGroupModel'
import { transErrors, transSuccess } from "../../../lang/vi";
import { env } from "../../config/env";

let facebookStratery = passportFacebook.Strategy;
let fbAppId =env.fbAppId
let fbAppSecret =env.fbAppSecret
let fbAppCallback =env.fbAppCallbackUrl
/**
 * Valid user account type: facebook
 */

export const initPassportFacebook =() =>{
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
     passport.deserializeUser(async (id, done)=>{ // lay user tu session, duoc khai bao tu file server.js
        try {
        
         let user = await  UserModel.findUserByIdForSessionToUse(id);
         let getChatGroupIds = await ChatGroupModel.getChatGroupIdsByUser(user._id);
         user = user.toObject();
         user.chatGroupIds =getChatGroupIds
         return done(null, user)
 
        } catch (error) {
         return done(err, nill)
        }
          
      })
 }
