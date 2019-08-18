import ContactModel from '../models/contactModel'
import UserMofel from '../models/userModel'
import _ from 'lodash';

let findUsersContact = (currentUserId, keyword)=>{
  return new Promise(async (resolve,reject) =>{
    let deprecatedUserIds =[];// nhuw userid loai bo,( đã kết bạn)
    let contactsByUser = await ContactModel.findAllByUser(currentUserId)
    contactsByUser.map((contact)=>{
        deprecatedUserIds.push(contact.userId)
        deprecatedUserIds.push(contact.contactId)
    })
    deprecatedUserIds = _.uniqBy(deprecatedUserIds);// lọc ra các giá trị trùng nhau trong mảng

    let users = await UserMofel.findAllForAddContact(deprecatedUserIds,keyword)
    resolve(users)
  })
}
 
module.exports = {
  findUsersContact,
}
