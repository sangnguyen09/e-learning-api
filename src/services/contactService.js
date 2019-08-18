import ContactModel from '../models/contactModel'
import UserMofel from '../models/userModel'
import _ from 'lodash';

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId]; // nhuw userid loai bo,( đã kết bạn)
        let contactsByUser = await ContactModel.findAllByUser(currentUserId)
        contactsByUser.map((contact) => {
            deprecatedUserIds.push(contact.userId)
            deprecatedUserIds.push(contact.contactId)
        })
        deprecatedUserIds = _.uniqBy(deprecatedUserIds); // lọc ra các giá trị trùng nhau trong mảng

        let users = await UserMofel.findAllForAddContact(deprecatedUserIds, keyword)
        resolve(users)
    })
}

let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let contactExists = await ContactModel.checkExists(currentUserId, contactId);
        if (contactExists) {
            return reject(false)
        }

        let newContactObj = {
            userId: currentUserId,
            contactId: contactId
        }
        let newContact = await ContactModel.createNew(newContactObj)
        resolve(newContact)
    })
}

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReq = await ContactModel.removeRequestContact(currentUserId,contactId)
        if (removeReq.result.n === 0) {//removeReq.result ={n:1,ok:1} ket qủa trả về của việc xóa
            reject(false);
        }
        resolve(removeReq)
    })
}

module.exports = {
    findUsersContact,
    addNew,
    removeRequestContact,
}