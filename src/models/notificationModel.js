import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    type: String,
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now
    },

})
NotificationSchema.statics = {
    createNew(item) {
        return this.create(item) // create có sẵn trong moongoose tạo bản ghi mới
    },

    removeRequestContactSentNotification(senderId, receiverId, type) {
        return this.remove({
            $and: [{
                    'senderId': senderId
                },
                {
                    'receiverId': receiverId
                },
                {
                    'type': type
                },
            ]
        }).exec()
    },
    /**
     * get user and limit
     * @param {string} userId 
     * @param {number} limit 
     */
    getByUserIdAndLimit(userId, limit) {
        return this.find({
            'receiverId': userId
        }).sort({
            'createdAt': -1
        }).limit(limit).exec() // -1 la lay cai moi nhat
    },
    /**
     * 
     * @param {string} userId 
     * @param {number} skip 
     * @param {number} limit 
     */
    readMore(userId, skip, limit) {
        return this.find({
            'receiverId': userId
        }).sort({
            'createdAt': -1
        }).skip(skip).limit(limit).exec() // -1 la lay cai moi nhat
    },

    countNofifUnread(userId) {
        return this.count({
            $and: [{
                    'receiverId': userId
                },
                {
                    'isRead': false
                },
            ]
        }).exec() // -1 la lay cai moi nhat
    },
    /**
     * 
     * @param {string} userId 
     * @param {array} targetUsers 
     */
    markAllAsRead(userId, targetUsers) {
        return this.updateMany({
            $and: [
                {
                    'receiverId': userId
                },
                {
                    'senderId': {
                        $in: targetUsers
                    }
                },
            ]
        }, {
            'isRead': true
        }).exec()
    }

}
export const NOTIFICATION_TYPES = {
    ADD_CONTACT: "add_contact",
    APPROVE_CONTACT: "approve_contact",

}
export const NOTIFICATION_CONTENTS = {
    getCOntent: (notificationType, isRead, userId, username, userAvatar) => {
        if (notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
            let classReaded = isRead ? '' : ' class="notif-readed-false" '
            return `
                <div ${classReaded} data-uid="${ userId}">
                    <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
                    <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
                </div> 
            `
        }
        if (notificationType === NOTIFICATION_TYPES.APPROVE_CONTACT) {
            let classReaded = isRead ? '' : ' class="notif-readed-false" '
            return `
                <div ${classReaded} data-uid="${ userId}">
                    <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
                    <strong>${username}</strong> đã đã chấp nhận lời mời kết bạn!
                </div> 
            `
        }
        return "No matching with any notification type"
    }
}
export const NotificationModel = mongoose.model('notification', NotificationSchema) // notification để số it khi tạo bảng dữ liệu nó sẽ tự thêm s