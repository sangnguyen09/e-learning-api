import passport from "passport";
import passportGoogle from "passport-google-oauth"; // kiêm tra đang nhập
import UserModel from '../../models/userModel'
import ChatGroupModel from '../../models/chatGroupModel'
import { transErrors, transSuccess } from "../../../lang/vi";
import { env } from "../../config/env";

let GoogleStratery = passportGoogle.OAuth2Strategy;
let ggAppId =env.ggAppId
let ggAppSecret =env.ggAppSecret
let ggAppCallback =env.ggAppCallbackUrl
/**
 * Valid user account type: Google
 */

export const initPassportGoogle =() =>{
     passport.use(new GoogleStratery({
        clientID: ggAppId,
        clientSecret:ggAppSecret,
        callbackURL:ggAppCallback,
         passReqToCallback: true // goi ham callback
     }, async (req, accessToken, refeshToken,profile, done)=>{ // de dung thu tu tham so
        try {
            let user = await UserModel.findByGoogleUid(profile.id)
            if (user) {
                return done(null, user, req.flash('success', transSuccess.loginSuccess(user.username)))
            }
            console.log(profile)
            let newUserItem ={
                username : profile.displayName,
                gender: profile.gender,
                local:{isActive:true},
                google:{
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
