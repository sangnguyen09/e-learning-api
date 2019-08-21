import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import ChatGroupModel from '../models/chatGroupModel';
import _ from 'lodash'
import {
	MessageModel
} from '../models/messageModel';

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
				let getMessages = await MessageModel.getMessages(currentUserId, conversation._id, LIMIT_MESSAGE_TAKEN);
					conversation = conversation.toObject()
					conversation.messages = getMessages
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
