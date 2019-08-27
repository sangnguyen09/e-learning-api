import ContactModel from '../models/contactModel'
import {
    NOTIFICATION_TYPES,
    NotificationModel
} from '../models//notificationModel'
import ChatGroupModel from '../models/chatGroupModel'
import _ from 'lodash';
 
 
 
let addNew = (currentUserId, groupChatName,arrayIds) => {
    return new Promise(async (resolve, reject) => {
      let members = [...arrayIds,{userId:currentUserId}]
        // create chatGroup
       let itemNewChatGroup = {
            name: groupChatName,
            userAmount:  members.length,
            userId: currentUserId,
            members
          };
        let newChatGroup = new ChatGroupModel(itemNewChatGroup)
        newChatGroup.save()
        // // create notification
        // let notificationItem = {
        //     senderId: currentUserId,
        //     receiverId: contactId,
        //     type: NOTIFICATION_TYPES.ADD_CONTACT
        // }

        // await NotificationModel.createNew(notificationItem) // tao  mới notify

        resolve(newChatGroup)
    })
}

 
module.exports = {
	addNew,
	 
}
