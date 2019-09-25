import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4"; //tạo verifytoken
import { transErrors, transSuccess, transMail, transValidation } from "../../lang/vi";
import sendMail from "./../config/mailer";
import { app } from "../config/app";


let saltRounds = 7;

let register = (objUser, protocol, host) => {
	// vif thực thi 2 lần await tro nên cần tạo Promise để trả về cho hàm thực thi ở controller
	return new Promise(async (resolve, reject) => {
		let userByEmail = await UserModel.findByEmail(objUser.email);
		if (userByEmail) {
			if (userByEmail.deletedAt !== null) {
				return reject(transErrors.account_remove);
			}
			if (!userByEmail.isActive) {
				return reject(transErrors.account_not_active);
			}
			return reject(transErrors.account_in_use); // ton tai thi tra ve reject
		}
		let salt = bcrypt.genSaltSync(saltRounds); // tao muoi de ma hoa mat khau
		let userItem = {
			userName: objUser.email.split("@")[0],
			fullName: objUser.fullName,
			phone: objUser.phone,
			email: objUser.email,
			local: {
				password: bcrypt.hashSync(objUser.password, salt),
				verifyToken: uuidv4()
			}
		};
		let user = await UserModel.createNew(userItem);
		// send email
		// let linkVerify = `${protocol}://${host}/api/auth/verify/${user.local.verifyToken}`; // cái này để veri cho server hiện tai
		 let linkVerify = `${app.linkRedirectVerifyAccount}/${user.local.verifyToken}`; // cái này để veri cho domain khác muốn nhận 
		sendMail(objUser.email, transMail.subject, transMail.template(linkVerify,app.nameApp))
			.then(result => {
				return resolve(transSuccess.userCreated(user.email));
			})
			.catch(async err => {
				// xoa user di
				await UserModel.removeById(user._id);
				return reject(transMail.send_failed);
			});
	});
};
let verifyAccount = token => {
	return new Promise(async (resolve, reject) => {
		let userByToken = await UserModel.findByToken(token);
		if (!userByToken) {
			return reject(transErrors.token_undifined);
		}

		await UserModel.verify(token);
		resolve(transSuccess.account_actived);
	});
};
let saveRefreshToken = (userId,token) => {
	return new Promise(async (resolve, reject) => {
		let result = await UserModel.saveRefreshToken(userId,token);
		if (!result) {
			return reject(false);
		}
		resolve(true);
	});
};
let checkRefreshTokenByUser = (userId,refreshToken) => {
	return new Promise(async (resolve, reject) => {
		let result = await UserModel.checkRefreshTokenByUser(userId,refreshToken);
		if (!result) {
			return reject(transValidation.refresh_token_incorrect);
		}
		if (result&& !result.isActive) {
			return reject(transErrors.account_not_active);
		}
		resolve(result);
	});
};
let getUserInfo = (userId) => {
	return new Promise(async (resolve, reject) => {
		let result = await UserModel.findUserByJWT(userId);
		if (!result) {
			return reject(transValidation.refresh_token_incorrect);
		}
		if (result&& !result.isActive) {
			return reject(transErrors.account_not_active);
		}
		resolve(result);
	});
};
let forgotPassword = (email) => {
	return new Promise(async (resolve, reject) => {
		let result = await UserModel.findByEmail(email);

		if (!result) {
			return reject(transErrors.account_find_not_found);
		}
		if (result&& !result.isActive) {
			return reject(transErrors.account_not_active);
		}
		let forgotPasswordToken =uuidv4()
		 await UserModel.saveForgotPasswordToken(result._id,forgotPasswordToken);// lưu lai toke vào csdl để kiểm tra
		console.log(forgotPasswordToken);
		let timeOutPassword 
		timeOutPassword && clearTimeout(timeOutPassword);// nếu có timeout thi xoá đi, tránh trường hợp người dùng bấm liên tục thi nó sẽ lây giá trị cuối cùng
		// send email
		// let linkVerify = `${protocol}://${host}/api/auth/verify/${user.local.verifyToken}`; // cái này để veri cho server hiện tai
		let linkVerify = `${app.linkRedirectForgotPassword}/${forgotPasswordToken}`; // cái này để veri cho domain khác muốn nhận 
		sendMail(result.email, transMail.subject_forgot_password, transMail.template_forgot_password(linkVerify,app.nameApp,app.minuteRequestForgotPassword))
			.then(res => {
				 timeOutPassword =	setTimeout(() => {
					console.log('huy token');
					UserModel.saveForgotPasswordToken(result._id,null);// Xoá token khi hết thời gian cho phep request
				}, 1000*60*app.minuteRequestForgotPassword);
				return resolve(transSuccess.user_request_forgot_password_success);
			})
			.catch(async err => {
				return reject(transMail.send_failed);
			});

	});
};
let resetPassword = (password,token) => {
	return new Promise(async (resolve, reject) => {
		let userByToken = await UserModel.findForgotPasswordToken(token);
		if (!userByToken) {
			return reject(transErrors.token_undifined);
		}

		let salt  = bcrypt.genSaltSync(saltRounds);
        await UserModel.updatePassword(userByToken._id,bcrypt.hashSync(password, salt));
        resolve(true)
 
	});
};
module.exports = {
	register,
	verifyAccount,
	saveRefreshToken,
	checkRefreshTokenByUser,
	getUserInfo,
	forgotPassword,
	resetPassword
};
