import passport from "passport";
import passportLocal from "passport-local"; // kiêm tra đang nhập

// Model
import UserModel from '../../models/userModel'

import {
	transErrors,
	transSuccess
} from "../../../lang/vi";

import jwt from 'jsonwebtoken';
import { configJWT } from "../../config/jwt";
import Joi from "@hapi/joi";

const localStratery = passportLocal.Strategy;

/**
 * Valid user account type: Local
 */

export const initPassportLocal = () => {
	passport.use(new localStratery({
		usernameField: 'email',
		passwordField: 'password', // lay tu form name,
		passReqToCallback: true // goi ham callback
	}, async (req, email, password, done) => {
		  // check giá tri object truyền lên:
		  const schemaAuthorId = Joi.object({
			email:  Joi.string().email(),//{ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }
			password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
		  }).and("email", "password");
		  let result1 = schemaAuthorId.validate({email, password});
		  if (result1.error) { 
			req.authError = transErrors.login_failed
			return done(null, false)
			 
		  }
		try {
			let user = await UserModel.findByEmail(email)
			if (!user) {
				req.authError = transErrors.login_failed
				return done(null, false)
			}
			if (!user.isActive) {
				req.authError = transErrors.account_not_active
				return done(null, false)
			}
			let checkPassword = await user.comparePassword(password) // là method đc viết ở Model user dùng để tương tác với dữ liệu dc lấy ra từ csdl
			if (!checkPassword) {
				req.authError = transErrors.login_failed
				return done(null, false)
			}
			return done(null, user.toObject(), {
				message: transSuccess.loginSuccess(user.username)
			}) //user.toObject() chuyển về object cho dễ nhìn
		} catch (error) {
			req.authError = transErrors.server_error
			return done(null, false)
		}
	}))

	 
}

export const loginLocalController = async (req, res, next) => {
	if (req.user) {
		let resUser = {
			id: req.user._id,
			userName: req.user.userName,
			fullName: req.user.fullName,
			avatar: `${req.protocol}://${req.get("host")}/images/users/${req.user.avatar}`,
			address: req.user.address,
			phone: req.user.phone,
			role: req.user.role,
			email: req.user.email,
		} 
        // Tạo mã token cho user
        const token = jwt.sign(resUser,configJWT.secret,{
            expiresIn:configJWT.tokenLife
		})
		
        // Tạo mã refresh token 
        const refreshToken = jwt.sign({id:resUser.id},configJWT.refreshTokenSecret,{
            expiresIn:configJWT.refreshTokenLife
		})
		
        let result = await UserModel.saveRefreshToken(resUser.id, refreshToken)

        // trả lại thông tin cho người dùng kèm mã token
	   result && res.status(200).json({userInfo:resUser,token, refreshToken})
        
	}


}
