import {
	validationResult
} from "express-validator/check";
import {
	message
} from "../services";
import multer from 'multer';
import {
	app
} from '../config/app';
import {
	transErrors,
	transSuccess
} from '../../lang/vi';
import fsExtra from 'fs-extra'


// xu ly tin nhan van ban va emoji
export const addNewTextEmoji = async (req, res) => {
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
		let sender = {
			id: req.user._id,
			name: req.user.username,
			avatar: req.user.avatar,
		}
		let receiverId = req.body.uid;
		let messageVal = req.body.messageVal;
		let isChatGroup = req.body.isChatGroup;
		let newMessage = await message.addNewTextEmoji(sender, receiverId, messageVal, isChatGroup)

		return res.status(200).send({
			message: newMessage
		})
	} catch (error) {
		return res.status(500).send(error);
	}
}

// xu ly tin nhan hinh
let storageImageChat = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, app.image_chat_directory)
	},
	filename: (req, file, callback) => {
		let math = app.image_chat_type;
		if (math.indexOf(file.mimetype) === -1) {
			return callback(transErrors.image_chat_type, null)
		}

		let imageName = `${Date.now()}-${file.originalname}`
		callback(null, imageName)
	}
});
let imageMessageUploadFile = multer({
	storage: storageImageChat,
	limits: {
		fileSize: app.image_chat_limit_size
	}
}).single('my-image-chat') //avatar trung voi formData o file js  formData.append('avatar', fileData);

export const addNewImage = (req, res) => {
	imageMessageUploadFile(req, res, async (err) => {

		if (err) {
			if (err.message) {
				return res.status(500).send(transErrors.image_chat_size)
			}
			return res.status(500).send(err)
		}

		try {
			let sender = {
				id: req.user._id,
				name: req.user.username,
				avatar: req.user.avatar,
			}
			let receiverId = req.body.uid;
			let messageVal = req.file;
			let isChatGroup = req.body.isChatGroup;
			let newMessage = await message.addNewImage(sender, receiverId, messageVal, isChatGroup)

			// remove image bởi vì hình ảnh luw trong mongodb
			await fsExtra.remove(messageVal.path)
			return res.status(200).send({
				message: newMessage
			})
		} catch (error) {
			return res.status(500).send(error);
		}
	});

}

// xu ly phan tin nhan tap tin
let storageAttachmentChat = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, app.attachment_chat_directory)
	},
	filename: (req, file, callback) => {

		let attachmentName = `${Date.now()}-${file.originalname}`
		callback(null, attachmentName)
	}
});
let attachmentMessageUploadFile = multer({
	storage: storageAttachmentChat,
	limits: {
		fileSize: app.attachment_chat_limit_size
	}
}).single('my-attachment-chat') 

export const addNewAttachment = (req, res) => {
	attachmentMessageUploadFile(req, res, async (err) => {
		if (err) {
			if (err.message) {
				return res.status(500).send(transErrors.attachment_chat_size)
			}
			return res.status(500).send(err)
		}

		try {
			let sender = {
				id: req.user._id,
				name: req.user.username,
				avatar: req.user.avatar,
			}
			let receiverId = req.body.uid;
			let messageVal = req.file;
			let isChatGroup = req.body.isChatGroup;

			let newMessage = await message.addNewAttachment(sender, receiverId, messageVal, isChatGroup)
			// remove attachment bởi vì luw trong mongodb
			await fsExtra.remove(messageVal.path)
			return res.status(200).send({
				message: newMessage
			})
		} catch (error) {
			return res.status(500).send(error);
		}
	});

}
