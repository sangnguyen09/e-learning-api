import ContactModel from '../models/contactModel'
import {
    NOTIFICATION_TYPES,
    NotificationModel
} from '../models//notificationModel'
import UserModel from '../models/userModel'
import _ from 'lodash';

const LIMIT_NUMBER_TAKEN = 1



let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId]; // nhuw userid loai bo,( đã kết bạn)
        let contactsByUser = await ContactModel.findAllByUser(currentUserId)
        contactsByUser.map((contact) => {
            deprecatedUserIds.push(contact.userId)
            deprecatedUserIds.push(contact.contactId)
        })
        deprecatedUserIds = _.uniqBy(deprecatedUserIds); // lọc ra các giá trị trùng nhau trong mảng

        let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword)
        resolve(users)
    })
}

let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let contactExists = await ContactModel.checkExists(currentUserId, contactId);
        if (contactExists) {
            return reject(false)
        }
        // create contact
        let newContactObj = {
            userId: currentUserId,
            contactId: contactId
        }
        let newContact = await ContactModel.createNew(newContactObj)
        // create notification
        let notificationItem = {
            senderId: currentUserId,
            receiverId: contactId,
            type: NOTIFICATION_TYPES.ADD_CONTACT
        }

        await NotificationModel.createNew(notificationItem) // tao  mới notify

        resolve(newContact)
    })
}

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId)
        if (removeReq.result.n === 0) { //removeReq.result ={n:1,ok:1} ket qủa trả về của việc xóa
            reject(false);
        }
        // remove notifycation
        await NotificationModel.removeRequestContactNotification(currentUserId, contactId, NOTIFICATION_TYPES.ADD_CONTACT)

        // tra ve kq cho cliebt
        resolve(removeReq)
    })
}
let getContacts = (currentUserId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER_TAKEN)
            let users = contacts.map(async contact => {
                if (contact.contactId == currentUserId) { // so sanh 2 dau =,currentUserId la object
                    return await UserModel.getNormalUserDataById(contact.userId);
                } else {
                    return await UserModel.getNormalUserDataById(contact.contactId);
                }
            })
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}
let getContactsSent = (currentUserId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let contacts = await ContactModel.getContactsSent(currentUserId, LIMIT_NUMBER_TAKEN)
            let users = contacts.map(async contact => {
                return await UserModel.getNormalUserDataById(contact.contactId);
            })
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}
let getContactsReceived = (currentUserId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let contacts = await ContactModel.getContactsReceived(currentUserId, LIMIT_NUMBER_TAKEN)
            let users = contacts.map(async contact => {
                return await UserModel.getNormalUserDataById(contact.userId);
            })
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}
let countAllContacts = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await ContactModel.countAllContacts(currentUserId);
            resolve(count)
        } catch (error) {
            reject(error)
        }
    })
}
let countAllContactsSent = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await ContactModel.countAllContactsSent(currentUserId);
            resolve(count)
        } catch (error) {
            reject(error)
        }
    })
}
let countAllContactsReceived = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await ContactModel.countAllContactsReceived(currentUserId);
            resolve(count)
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Read more contacts . max 10 item one time
 * @param {string} currentUserId 
 * @param {number} skipNumberContacts 
 */
let readMoreContacts = (currentUserId, skipNumberContacts) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            let newContacts = await ContactModel.readMoreContacts(currentUserId, skipNumberContacts, LIMIT_NUMBER_TAKEN)

            let users = newContacts.map(async contact => {
                if (contact.contactId == currentUserId) { // so sanh 2 dau =,currentUserId la object
                    return await UserModel.getNormalUserDataById(contact.userId);
                } else {
                    return await UserModel.getNormalUserDataById(contact.contactId);
                }

            })
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error);
        }
    })
}
/**
 * Read more contacts sent . max 10 item one time
 * @param {string} currentUserId 
 * @param {number} skipNumberContacts 
 */
let readMoreContactsSent = (currentUserId, skipNumberContacts) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            let newContacts = await ContactModel.readMoreContactsSent(currentUserId, skipNumberContacts, LIMIT_NUMBER_TAKEN)

            let users = newContacts.map(async contact => {
                return await UserModel.getNormalUserDataById(contact.contactId);

            })
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error);
        }
    })
}
/**
 * Read more contacts received . max 10 item one time
 * @param {string} currentUserId 
 * @param {number} skipNumberContacts 
 */
let readMoreContactsReceived = (currentUserId, skipNumberContacts) => {
   
   
    return new Promise(async (resolve, reject) => {
        try {
            let newContacts = await ContactModel.readMoreContactsReceived(currentUserId, skipNumberContacts, LIMIT_NUMBER_TAKEN)
            
            let users = newContacts.map(async contact => {
                return await UserModel.getNormalUserDataById(contact.userId);
            })
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    findUsersContact,
    addNew,
    removeRequestContact,
    getContactsReceived,
    getContacts,
    getContactsSent,
    countAllContacts,
    countAllContactsReceived,
    countAllContactsSent,
    readMoreContacts,
    readMoreContactsSent,
    readMoreContactsReceived,
}