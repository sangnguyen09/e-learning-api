import {
    NotificationModel,
    NOTIFICATION_CONTENTS
} from "../models/notificationModel";
import UserModel from "../models/userModel";

/**
 * get notification whien f5 page, get 10 item
 */
export const getNotifications = (currentUserId, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.getByUserIdAndLimit(currentUserId, limit);
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

            resolve(notificationsUnread)// neu bi Promise { <pending> } thi dung cach nay de lay ket qua
        } catch (error) {
            reject(error)
        }
    })
}