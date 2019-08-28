import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import ChatGroupModel from '../models/chatGroupModel';
import _ from 'lodash'
import {
	MessageModel,
	MESSAGE_CONVERSATION_TYPE,
	MESSAGE_TYPE
} from '../models/messageModel';
import {
	transErrors
} from '../../lang/vi';
import {
	app
} from '../config/app';
import fsExtra from 'fs-extra'


const LIMIT_CONVERSATIONS_TAKEN = 10
const LIMIT_MESSAGE_TAKEN = 30
export const getAllConversationItems = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSATIONS_TAKEN)
			let userConversationsPromise = contacts.map(async contact => {
				if (contact.contactId == currentUserId) { // so sanh 2 dau =,currentUserId la object
					let getUserContact = await UserModel.getNormalUserDataById(contact.userId);
					getUserContact.updatedAt = contact.updatedAt
					return getUserContact
				} else {
					let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
					getUserContact.updatedAt = contact.updatedAt
					return getUserContact
				}
			})
			let usersConversations = await Promise.all(userConversationsPromise)
			let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATIONS_TAKEN)
			let allConversations = usersConversations.concat(groupConversations);
			allConversations = _.sortBy(allConversations, (item) => -item.updatedAt)

			// lay tin nhắn từ đổ ra cuộc hội thoại
			let allConversationWithMessage = allConversations.map(async conversation => {
				conversation = conversation.toObject()
				if (conversation.members) {
					let getMessages = await MessageModel.getMessagesInGroup(conversation._id, LIMIT_MESSAGE_TAKEN);
					conversation.messages = _.reverse(getMessages)
				} else {
					let getMessages = await MessageModel.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGE_TAKEN);
					conversation.messages = _.reverse(getMessages)
				}

				return conversation
			})
			let allConversationMessages = await Promise.all(allConversationWithMessage);
			allConversationMessages = _.sortBy(allConversationMessages, (item) => -item.updatedAt)
			resolve({

				allConversationMessages
			})
		} catch (error) {
			reject(error)
		}
	})
}

/**
 *
 * @param {objec} sender current
 * @param {string} receiverId id of an user or a gr
 * @param {string} messageVal
 * @param {boolen} isChatGroup
 */
export const addNewTextEmoji = (sender, receiverId, messageVal, isChatGroup) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (isChatGroup) {
				let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
				if (!getChatGroupReceiver) {
					return reject(transErrors.conversation_not_found)
				}
				let receiver = {
					id: getChatGroupReceiver._id,
					name: getChatGroupReceiver.name,
					avatar: app.general_avatar_group_chat,
				}
				let newMessageItem = {
					senderId: sender.id,
					receiverId: receiver.id,
					conversationType: MESSAGE_CONVERSATION_TYPE.GROUP,
					messageType: MESSAGE_TYPE.TEXT,
					sender: sender,
					receiver: receiver,
					text: messageVal,
					createdAt: Date.now(),

				}
				//  tao tin nhắn
				let newMessage = await MessageModel.createNew(newMessageItem);
				// update group chat để cập nhật lại ví trí
				await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
				resolve(newMessage);
			} else {
				let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
				if (!getUserReceiver) {
					return reject(transErrors.conversation_not_found)
				}
				let receiver = {
					id: getUserReceiver._id,
					name: getUserReceiver.username,
					avatar: getUserReceiver.avatar,
				}
				let newMessageItem = {
					senderId: sender.id,
					receiverId: receiver.id,
					conversationType: MESSAGE_CONVERSATION_TYPE.PERSONAL,
					messageType: MESSAGE_TYPE.TEXT,
					sender: sender,
					receiver: receiver,
					text: messageVal,
					createdAt: Date.now(),

				}
				let newMessage = await MessageModel.createNew(newMessageItem)
				// update contact để cập nhật lại ví trí
				await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id);

				resolve(newMessage);
			}
		} catch (error) {
			reject(error)
		}
	})
}
/**
 * add new image chat
 * @param {objec} sender current
 * @param {string} receiverId id of an user or a gr
 * @param {file} messageVal
 * @param {boolen} isChatGroup
 */
export const addNewImage = (sender, receiverId, messageVal, isChatGroup) => {
	console.log(sender);
	return new Promise(async (resolve, reject) => {
		try {
			if (isChatGroup) {
				let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
				if (!getChatGroupReceiver) {
					return reject(transErrors.conversation_not_found)
				}
				let receiver = {
					id: getChatGroupReceiver._id,
					name: getChatGroupReceiver.name,
					avatar: app.general_avatar_group_chat,
				}
				let imageBuffer = await fsExtra.readFile(messageVal.path);
				let imageContentType = messageVal.mimetype;
				let imageName = messageVal.filename;

				let newMessageItem = {
					senderId: sender.id,
					receiverId: receiver.id,
					conversationType: MESSAGE_CONVERSATION_TYPE.GROUP,
					messageType: MESSAGE_TYPE.IMAGE,
					sender: sender,
					receiver: receiver,
					file: {
						data: imageBuffer,
						contentType: imageContentType,
						fileName: imageName
					},
					createdAt: Date.now(),

				}
				//  tao tin nhắn
				let newMessage = await MessageModel.createNew(newMessageItem);
				// update group chat để cập nhật lại ví trí
				await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
				resolve(newMessage);
			} else {
				let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
				if (!getUserReceiver) {
					return reject(transErrors.conversation_not_found)
				}
				let receiver = {
					id: getUserReceiver._id,
					name: getUserReceiver.username,
					avatar: getUserReceiver.avatar,
				}

				let imageBuffer = await fsExtra.readFile(messageVal.path);
				let imageContentType = messageVal.mimetype;
				let imageName = messageVal.originalname;

				let newMessageItem = {
					senderId: sender.id,
					receiverId: receiver.id,
					conversationType: MESSAGE_CONVERSATION_TYPE.PERSONAL,
					messageType: MESSAGE_TYPE.IMAGE,
					sender: sender,
					receiver: receiver,
					file: {
						data: imageBuffer,
						contentType: imageContentType,
						fileName: imageName
					},
					createdAt: Date.now(),

				}
				let newMessage = await MessageModel.createNew(newMessageItem)
				// update contact để cập nhật lại ví trí
				await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id);

				resolve(newMessage);
			}
		} catch (error) {
			reject(error)
		}
	})
}
/**
 * add new image chat
 * @param {objec} sender current
 * @param {string} receiverId id of an user or a gr
 * @param {file} messageVal
 * @param {boolen} isChatGroup
 */
export const addNewAttachment = (sender, receiverId, messageVal, isChatGroup) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (isChatGroup) {
				let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
				if (!getChatGroupReceiver) {
					return reject(transErrors.conversation_not_found)
				}
				let receiver = {
					id: getChatGroupReceiver._id,
					name: getChatGroupReceiver.name,
					avatar: app.general_avatar_group_chat,
				}
				let attachmentBuffer = await fsExtra.readFile(messageVal.path);
				let attachmentContentType = messageVal.mimetype;
				let attachmentName = messageVal.originalname;

				let newMessageItem = {
					senderId: sender.id,
					receiverId: receiver.id,
					conversationType: MESSAGE_CONVERSATION_TYPE.GROUP,
					messageType: MESSAGE_TYPE.FILE,
					sender: sender,
					receiver: receiver,
					file: {
						data: attachmentBuffer,
						contentType: attachmentContentType,
						fileName: attachmentName
					},
					createdAt: Date.now(),

				}
				//  tao tin nhắn
				let newMessage = await MessageModel.createNew(newMessageItem);
				// update group chat để cập nhật lại ví trí
				await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
				resolve(newMessage);
			} else {
				let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
				if (!getUserReceiver) {
					return reject(transErrors.conversation_not_found)
				}
				let receiver = {
					id: getUserReceiver._id,
					name: getUserReceiver.username,
					avatar: getUserReceiver.avatar,
				}

				let attachmentBuffer = await fsExtra.readFile(messageVal.path);
				let attachmentContentType = messageVal.mimetype;
				let attachmentName = messageVal.originalname;

				let newMessageItem = {
					senderId: sender.id,
					receiverId: receiver.id,
					conversationType: MESSAGE_CONVERSATION_TYPE.PERSONAL,
					messageType: MESSAGE_TYPE.FILE,
					sender: sender,
					receiver: receiver,
					file: {
						data: attachmentBuffer,
						contentType: attachmentContentType,
						fileName: attachmentName
					},
					createdAt: Date.now(),

				}
				let newMessage = await MessageModel.createNew(newMessageItem)
				// update contact để cập nhật lại ví trí
				await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id);

				resolve(newMessage);
			}
		} catch (error) {
			reject(error)
		}
	})
}

/**
 * 
 * @param {*} currentUserId 
 * @param {*} skipPersonal 
 * @param {*} skipGroup 
 */
export const readMoreAllChat = (currentUserId, skipPersonal, skipGroup) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contacts = await ContactModel.readMoreContacts(currentUserId,skipPersonal, LIMIT_CONVERSATIONS_TAKEN)

			let userConversationsPromise = contacts.map(async contact => {
				if (contact.contactId == currentUserId) { // so sanh 2 dau =,currentUserId la object
					let getUserContact = await UserModel.getNormalUserDataById(contact.userId);
					getUserContact.updatedAt = contact.updatedAt
					return getUserContact
				} else {
					let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
					getUserContact.updatedAt = contact.updatedAt
					return getUserContact
				}
			})
			let usersConversations = await Promise.all(userConversationsPromise)

			let groupConversations = await ChatGroupModel.readMoreChatGroup(currentUserId,skipGroup, LIMIT_CONVERSATIONS_TAKEN)
			let allConversations = usersConversations.concat(groupConversations);
			allConversations = _.sortBy(allConversations, (item) => -item.updatedAt)

			// lay tin nhắn từ đổ ra cuộc hội thoại
			let allConversationWithMessage = allConversations.map(async conversation => {
				conversation = conversation.toObject()
				if (conversation.members) {
					let getMessages = await MessageModel.getMessagesInGroup(conversation._id, LIMIT_MESSAGE_TAKEN);
					conversation.messages = _.reverse(getMessages)
				} else {
					let getMessages = await MessageModel.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGE_TAKEN);
					conversation.messages = _.reverse(getMessages)
				}

				return conversation
			})
			let allConversationMessages = await Promise.all(allConversationWithMessage);
			allConversationMessages = _.sortBy(allConversationMessages, (item) => -item.updatedAt)
			resolve(allConversationMessages)
		} catch (error) {
			reject(error)
		}
	})
}
     