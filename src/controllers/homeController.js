import {notification, contact} from '../services/index'

let getHome = async(req, res) => {
    // only 10 items one time
     let notifications = await notification.getNotifications(req.user._id)
     // get amount notiificaitons unread
     let countNofifUnread = await notification.countNofifUnread(req.user._id)

     // get contacts 10 item one time
    let contacts = await contact.getContacts(req.user._id)

     // get contacts sent 10 item one time
     let contactsSent = await contact.getContactsSent(req.user._id)

     // get contacts received 10 item one time
     let contactsReceived = await contact.getContactsReceived(req.user._id)

     // count contacts
     let countAllContacts = await contact.countAllContacts(req.user._id)
     let countAllContactsSent = await contact.countAllContactsSent(req.user._id)
     let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id)
    return res.render("main/home/home", // been file cau hình đã định nghĩa đường dẫn src/view
        {
            errors: req.flash("errors"), // lay tu req ben duoi
            success: req.flash("success"),
            user: req.user,
            notifications,
            countNofifUnread,
            contacts,
            contactsSent,
            contactsReceived,
            countAllContacts,
            countAllContactsReceived,
            countAllContactsSent
        })
    
}

module.exports = {
    getHome
};