import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: null
    },
    deletedAt: {
        type: Number,
        default: null
    },


})

ContactSchema.statics = {
    createNew(item) {
        return this.create(item) // create có sẵn trong moongoose tạo bản ghi mới
    },
    /**
     * tim tat ca cac item lien quan den user
     * @param {*} userId
     */
    findAllByUser(userId) {
        return this.find({
            $or: [ // tim tat ca user id vừa là ng gửi kết bạn lưu trong (userId), vừa là người đc gửi kêt bạn lưu trong (contactId)
                {
                    "userId": userId
                },
                {
                    'contactId': userId
                }
            ]
        })
    },
    /**
     *
     * @param {string} userId
     * @param {string} contactId
     */
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [ // kiểm tra 1 trong 2 thằng đã gửi kết bạn rồi thì thằng còn lại ko dc gửi nữa
                {
                    $and: [{
                            'userId': userId
                        },
                        {
                            'contactId': contactId
                        } // truowngf hợp a đã gửi kết bạn với b
                    ]
                },
                {
                    $and: [{
                            'userId': contactId
                        }, // truowngf hợp b đã gửi kết bạn với a
                        {
                            'contactId': userId
                        }
                    ]
                },
            ]
        })
    },

    /**
     * removeContact
     * @param {string} userId
     * @param {string} contactId
     */
    removeContact(userId, contactId) {
        return this.remove({
			$or: [
                {
                    $and: [{
                            'userId': userId
                        },
                        {
                            'contactId': contactId
						}, // truowngf hợp a đã gửi kết bạn với b
						{'status':true}
                    ]
                },
                {
                    $and: [{
                            'userId': contactId
                        }, // truowngf hợp b đã gửi kết bạn với a
                        {
                            'contactId': userId
						},
						{'status':true}
                    ]
                },
            ]
        }).exec()
    },
    /**
     *
     * @param {string} userId
     * @param {string} contactId
     */
    removeRequestContactSent(userId, contactId) {
        return this.remove({
            $and: [{
                    'userId': userId
                },
                {
                    'contactId': contactId
                },
                {
                    'status': false
                }
            ]
        })
    },
    /**
     * removeRequestContactReceived
     * @param {string} userId
     * @param {string} contactId
     */
    removeRequestContactReceived(userId, contactId) {
        return this.remove({
            $and: [{
                    'userId': contactId
                },
                {
                    'contactId': userId
                },
                {
                    'status': false
                }
            ]
        })
    },
    /**
     * approveRequestContactReceived
     * @param {string: of currentUser} userId
     * @param {string} contactId
     */
    approveRequestContactReceived(userId, contactId) {
        return this.update({
            $and: [{
                    'userId': contactId
                },
                {
                    'contactId': userId
                },
                {
                    'status': false
                }
            ]
        }, {
			'status': true,
			'updatedAt': Date.now()
        })
    },

    getContacts(userId, limit) { // danh sach ban be
        return this.find({
            $and: [{
                    'status': true
                },
                {
                    $or: [{
                            'userId': userId
                        },
                        {
                            'contactId': userId
                        },
                    ]
                }
            ]
        }).sort({
            "updatedAt": -1
        }).limit(limit).exec()
    },
    getContactsSent(userId, limit) { // danh sachs minh gui yeu cau
        return this.find({
            $and: [{
                    'status': false
                },
                {
                    'userId': userId
                }
            ]
        }).sort({
            "createAt": -1
        }).limit(limit).exec()
    },
    getContactsReceived(userId, limit) { // danh sach minh dc gui yeu cau ket ban
        return this.find({
            $and: [{
                    'status': false
                },
                {
                    'contactId': userId
                }
            ]
        }).sort({
            "createAt": -1
        }).limit(limit).exec()
    },
    countAllContacts(userId) { // danh sach ban be
        return this.count({
            $and: [{
                    'status': true
                },
                {
                    $or: [{
                            'userId': userId
                        },
                        {
                            'contactId': userId
                        },
                    ]
                }
            ]
        }).exec()
    },
    countAllContactsSent(userId) { // danh sachs minh gui yeu cau
        return this.count({
            $and: [{
                    'status': false
                },
                {
                    'userId': userId
                }
            ]
        }).exec()
    },
    countAllContactsReceived(userId) { // danh sach minh dc gui yeu cau ket ban
        return this.count({
            $and: [{
                    'status': false
                },
                {
                    'contactId': userId
                }
            ]
        }).exec()
    },
    readMoreContacts(userId, skip, limit) {
        return this.find({
            $and: [{
                    'status': true
                },
                {
                    $or: [{
                            'userId': userId
                        },
                        {
                            'contactId': userId
                        },
                    ]
                }
            ]
        }).sort({
            "updatedAt": -1
        }).skip(skip).limit(limit).exec()
    },
    readMoreContactsSent(userId, skip, limit) {
        return this.find({
            $and: [{
                    'status': false
                },
                {
                    'userId': userId
                }
            ]
        }).sort({
            "createAt": -1
        }).skip(skip).limit(limit).exec()

    },
    readMoreContactsReceived(userId, skip, limit) {
        return this.find({
            $and: [{
                    'status': false
                },
                {
                    'contactId': userId
                }
            ]
        }).sort({
            "createAt": -1
        }).skip(skip).limit(limit).exec()
    }

}
module.exports = mongoose.model('contact', ContactSchema) // contact để số it khi tạo bảng dữ liệu nó sẽ tự thêm s
