import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4"; //tạo verifytoken
import { transErrors, transSuccess, transMail } from "../../lang/vi";
import sendMail from "./../config/mailer";

let saltRounds = 7;

let register = (email, gender, password, protocol, host) => {
	// vif thực thi 2 lần await tro nên cần tạo Promise để trả về cho hàm thực thi ở controller
	return new Promise(async (resolve, reject) => {
		let userByEmail = await UserModel.findByEmail(email);
		if (userByEmail) {
			if (userByEmail.deletedAt !== null) {
				return reject(transErrors.account_remove);
			}
			if (!userByEmail.local.isActive) {
				return reject(transErrors.account_not_active);
			}
			return reject(transErrors.account_in_use); // ton tai thi tra ve reject
		}
		let salt = bcrypt.genSaltSync(saltRounds); // tao muoi de ma hoa mat khau
		let userItem = {
			username: email.split("@")[0],
			gender: gender,
			local: {
				email: email,
				password: bcrypt.hashSync(password, salt),
				verifyToken: uuidv4()
			}
		};
		let user = await UserModel.createNew(userItem);
		// send email
		let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
		sendMail(email, transMail.subject, transMail.template(linkVerify))
			.then(result => {
				return resolve(transSuccess.userCreated(user.local.email));
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
module.exports = {
	register,
	verifyAccount
};
