import passport from "passport";
import passportJWT from 'passport-jwt';
import { configJWT } from "../../config/jwt";

// Model
import UserModel from '../../models/userModel'

import { transErrors, transSuccess } from "../../../lang/vi";


const extractJWT = passportJWT.ExtractJwt;
const jwtStratery =passportJWT.Strategy;

/**
 * Valid user account type: Local
 */

 export const initPassportJWT =() =>{
   
     passport.use(new jwtStratery({
         jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
         secretOrKey: configJWT.secret,
         passReqToCallback:true, // cho req vào function callback
     },async (req, jwtPayload , done) =>{
         if (!jwtPayload) {
            req.authError = transErrors.token_failed
            return done(null, false)
         }
         try {
			let user = await UserModel.findUserByJWT(jwtPayload.id)
			if (!user) {
				req.authError = transErrors.token_failed
				return done(null, false)
			}
            
			return done(null, user.toObject()) //user.toObject() chuyển về object cho dễ nhìn
		} catch (error) {
			req.authError = transErrors.server_error
			return done(null, false)
		}
     }))
   
 }
