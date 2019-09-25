import {
	validationResult
} from "express-validator/check";
import {
	auth
} from './../services/index'
import {
	transSuccess, transValidation, transErrors
} from "../../lang/vi";
import {
	verifyJwtToken
} from "../helpers/decodeJWT";
import {
	configJWT
} from "../config/jwt";
import jwt from 'jsonwebtoken';

import UserModel from '../models/userModel';

let getLoginRegister = (req, res) => {
	return res.render("auth/master");
};



let postRegister = async (req, res) => {
	let errorArr = [];
	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
		errors.map(item => {
			errorArr = [...errorArr, item.msg]; // dung push vao mang
		});

		return res.status(400).json({
			message: errorArr[0]
		});
	}
	// thanh cong luu bao CSDL
	try {
		let createUserSuccess = await auth.register(req.body, req.protocol, req.get("host")) // de thuc hien duoc dang ki thi cần đợi cho service kiểm tra tônf tại của email sau đó nó sé trả về Promise để ở đây sử dụng dc async await
		return res.status(200).json({
			message: createUserSuccess
		}); 

	} catch (error) {
		return res.status(500).json({
			message: error
		});
	}
};

let verifyAccount = async (req, res) => {

	try {
		let verifySuccess = await auth.verifyAccount(req.params.token)
		return res.status(200).json({
			message: verifySuccess
		});
	} catch (error) {
		return res.status(400).json({
			message: error
		});
	}

	
}
let getLogout = (req, res) => {
	req.logout(); // xoa session passport user
	req.flash("success", transSuccess.logout_success)
	return res.redirect("/login-register");
}
let checkLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) { //isAuthenticated() ham nay la cua passport dung kiem tra dang nhap
		return res.redirect("/login-register");
	}
	next();
}
let checkLoggedOut = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}
let refreshToken = async (req, res) => {
	let errorArr = [];
	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
		errors.map(item => {
			errorArr = [...errorArr, item.msg]; // dung push vao mang
		});

		return res.status(400).json({
			message: errorArr[0]
		});
	}
	try {
		let {refreshToken}= req.body

		let resultRefreshToken = await verifyJwtToken(refreshToken, configJWT.refreshTokenSecret)

		if (resultRefreshToken && resultRefreshToken.id) {
			let resultUser = await  auth.checkRefreshTokenByUser(resultRefreshToken.id,refreshToken)
			if (resultUser) {
				let resUser = {
					id: resultUser._id,
					userName: resultUser.userName,
					fullName: resultUser.fullName,
					avatar: resultUser.avatar,
					address: resultUser.address,
					phone: resultUser.phone,
					role: resultUser.role,
					email: resultUser.email,
				}
				 // Tạo mã token cho user
				 const token = jwt.sign(resUser,configJWT.secret,{
					expiresIn:configJWT.tokenLife
				})
				return res.status(200).json({
					token
				});
			}
			return res.status(401).json({ // không thấy user
				message: transErrors.unauthorized
			});
		

		}
		return res.status(401).json({ //decode token thất bại
			message: transErrors.unauthorized
		});
	} catch (error) {
		if (error) {
			return res.status(403).json({
				message: error
			});
		}
	}
}
let getUserInfo = async (req, res) => {

	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({
			message: transErrors.unauthorized
		});
	}
	try {
		let {token}= req.body
		let decodedToken = await verifyJwtToken(token, configJWT.secret)
		if (decodedToken && decodedToken.id) {
			let resultUser = await  auth.getUserInfo(decodedToken.id)
			if (resultUser) {
				let resUser = {
					id: resultUser._id,
					userName: resultUser.userName,
					fullName: resultUser.fullName,
					avatar: `${req.protocol}://${req.get("host")}/images/users/${ resultUser.avatar}`,
					address: resultUser.address,
					phone: resultUser.phone,
					role: resultUser.role,
					email: resultUser.email,
				}
			 
				return res.status(200).json({
					userInfo: resUser
				});
			}
			return res.status(401).json({ // không thấy user
				message: transErrors.unauthorized
			});

		}
		return res.status(401).json({// ko decode token được
			message: transErrors.unauthorized
		});
		
	} catch (error) {
		if (error) {
			return res.status(403).json({
				message: error
			});
		}
	}
}
let forgotPassword = async (req, res) => {
	let errorArr = [];
	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
		errors.map(item => {
			errorArr = [...errorArr, item.msg]; // dung push vao mang
		});

		return res.status(400).json({
			message: errorArr[0]
		});
	}
	try {
		let {email}= req.body
			let result = await auth.forgotPassword(email);
		return res.status(200).json({
			message: result
		});
		
	} catch (error) {
		if (error) {
			return res.status(403).json({
				message: error
			});
		}
	}
}
let resetPassword = async (req, res) => {
	let errorArr = [];
	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
		errors.map(item => {
			errorArr = [...errorArr, item.msg]; // dung push vao mang
		});

		return res.status(400).json({
			message: errorArr[0]
		});
	}
	try {
		let {password, tokenReset} = req.body
		// check token co tồn tại, trả ve user đc tim thấy
		let result=	await  auth.resetPassword(password,tokenReset)
		console.log(result);
		if (result) {
			return res.status(200).send({
				message: transSuccess.user_password_updated,
			})
		}
    
    } catch (error) {
        if (error) {
			return res.status(403).json({
				message: error
			});
		}
    }
}
module.exports = {
	getLoginRegister,
	postRegister,
	verifyAccount,
	getLogout,
	checkLoggedIn,
	checkLoggedOut,
	refreshToken,
	getUserInfo,
	forgotPassword,
	resetPassword
};
