import {
    NotificationModel,
    NOTIFICATION_CONTENTS
} from "../models/notificationModel";
import UserModel from "../models/userModel";

const LIMIT_NUMBER_TAKEN =10
/**
 * get notification whien f5 page, get 10 item
 */
export const getNotifications = (currentUserId ) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.getByUserIdAndLimit(currentUserId, LIMIT_NUMBER_TAKEN);

            let getNotifContent = notifications.map(async notification => {
                let sender = await UserModel.findUserById(notification.senderId);
                return NOTIFICATION_CONTENTS.getCOntent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar)
            })

            resolve(await Promise.all(getNotifContent))
        } catch (error) {
            reject(error)
        }
    })
}

// đếm tổng số thông báo chưa đọc
export const countNofifUnread = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notificationsUnread  = await NotificationModel.countNofifUnread(currentUserId)

            resolve(notificationsUnread)
            // neu bi Promise { <pending> } thi dung Promise.all  de lay ket qua
        } catch (error) {
            reject(error)
        }
    })
}
// load them thong bao
export const readMore = (currentUserId, skipNumber) => {
    return new Promise(async (resolve, reject) => {
        try {
             let newNotification = await NotificationModel.readMore(currentUserId, skipNumber, LIMIT_NUMBER_TAKEN)

             let getNotifContent = newNotification.map(async notification => {
                let sender = await UserModel.findUserById(notification.senderId);
                return NOTIFICATION_CONTENTS.getCOntent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar)
            })

            resolve(await Promise.all(getNotifContent))
        } catch (error) {
            reject(error);
        }
    })
}
/**
 *  danh dau tat ca thong bao la da doc
 * targetUsers: array
 */
//  
export const markAllAsRead = (currentUserId, targetUsers) => {
    return new Promise(async (resolve, reject) => {
        try {
            await NotificationModel.markAllAsRead(currentUserId, targetUsers)
            resolve(true)
        } catch (error) {
            console.log(`Error when mark notifications as read:${error}`);
            reject(false);
        }
    })
}