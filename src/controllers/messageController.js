import {
	validationResult
} from "express-validator/check";
import { message } from "../services";

export const addNewTextEmoji = async(req, res) => {
	let errorArr = [];
	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
		errors.map(item => {
			errorArr = [...errorArr, item.msg]; // dung push vao mang
		});
		return res.status(500).send(errorArr);
	}

	try {
		let sender ={
			id: req.user._id,
			name: req.user.username,
			avatar: req.user.avatar,
		}
		let receiverId = req.body.uid;
		let messageVal = req.body.messageVal;
		let isChatGroup = req.body.isChatGroup;
		let newMessage = await message.addNewTextEmoji(sender,receiverId,messageVal,isChatGroup)

		return res.status(200).send({message:newMessage})
	} catch (error) {
		return res.status(500).send(error);
	}
}
