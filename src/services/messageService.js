import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import ChatGroupModel from '../models/chatGroupModel';
import _ from 'lodash'

const LIMIT_CONVERSATIONS_TAKEN = 10
export const getAllConversationItems =(currentUserId)=>{
	return new Promise(async (resolve,reject)=>{
		try {
            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSATIONS_TAKEN)
            let userConversationsPromise = contacts.map(async contact => {
                if (contact.contactId == currentUserId) { // so sanh 2 dau =,currentUserId la object
					let getUserContact = await UserModel.getNormalUserDataById(contact.userId);
					getUserContact.createdAt = contact.createdAt
					return getUserContact
                } else {
                    return await UserModel.getNormalUserDataById(contact.contactId);
                }
			})
			let usersConversations =await Promise.all(userConversationsPromise)
			let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATIONS_TAKEN)
			let allConversations = usersConversations.concat(groupConversations);
			allConversations =_.sortBy(allConversations,(item)=> -item.createdAt)
            resolve( {
				usersConversations,
				groupConversations,
				allConversations,
			})
        } catch (error) {
            reject(error)
        }
	})
}
