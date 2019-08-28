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
import ejs from 'ejs'
import {
	lastItemOfArray,
	convertTimestampToHumanTime,
	bufferToBase64
} from '../helpers/clientHelper';
import {
	promisify
} from 'util' // tao promise

// ,=make ejs func renderfile available with async await
const renderFile = promisify(ejs.renderFile).bind(ejs)

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

export const readMoreAllChat = async (req, res) => {
	try {
		// get skipnumber by query params
		let skipPersonal = +(req.query.skipPersonal);
		let skipGroup = +(req.query.skipGroup);

		// get more item

		let newAllConversations = await message.readMoreAllChat(req.user._id, skipPersonal, skipGroup)

		let dataRender = {
			newAllConversations,
			lastItemOfArray,
			convertTimestampToHumanTime,
			bufferToBase64,
			user: req.user

		}
		let leftSideData = await renderFile('src/views/main/readMoreConversations/_leftSide.ejs', dataRender);
		let rightSideData = await renderFile('src/views/main/readMoreConversations/_rightSide.ejs', dataRender);
		let imageModalData = await renderFile('src/views/main/readMoreConversations/_imageModal.ejs', dataRender);
		let attactmentModalData = await renderFile('src/views/main/readMoreConversations/_attactmentModal.ejs', dataRender);

		return res.status(200).send({
			leftSideData,
			rightSideData,
			imageModalData,
			attactmentModalData
		})
	} catch (error) {
		return resizeBy.status(500).send(error)
	}
}
export const readMore = async (req, res) => {
	try {
		// get skipnumber by query params
		let skipMessage = +(req.query.skipMessage);
		let targetId = req.query.targetId;
		let chatInGroup = (req.query.chatInGroup ==='true');// convert to boolen
		// get more item

		let newMessage = await message.readMore(req.user._id, skipMessage, targetId, chatInGroup)

		let dataRender = {
			newMessage,
			bufferToBase64,
			user: req.user

		}
		let rightSideData = await renderFile('src/views/main/readMoreMessages/_rightSide.ejs', dataRender);
		let imageModalData = await renderFile('src/views/main/readMoreMessages/_imageModal.ejs', dataRender);
		let attactmentModalData = await renderFile('src/views/main/readMoreMessages/_attactmentModal.ejs', dataRender);

		return res.status(200).send({
			rightSideData,
			imageModalData,
			attactmentModalData
		})
	} catch (error) {
		return resizeBy.status(500).send(error)
	}
}
