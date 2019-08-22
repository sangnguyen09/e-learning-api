import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
	senderId: String,
	receiverId: String,
	conversationType: String,
	messageType: String,
	sender: {
		id: String,
		name: String,
		avatar: String
	},
	receiver: {
		id: String,
		name: String,
		avatar: String
	},
	text: String,
	file: {
		data: Buffer,
		contentType: String,
		fileName: String
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

MessageSchema.statics = {
	/**
	 *  create item
	 * @param {object} item
	 */
	createNew(item) {
        return this.create(item) // create có sẵn trong moongoose tạo bản ghi mới
    },
	/**
 * lay sanh saach tin nhan cua ca nhan
 */
	getMessagesInPersonal(senderId, receiverId, limit) {
		return this.find({
			$or: [{
					$and: [{
							'senderId': senderId
						},
						{
							'receiverId': receiverId
						},
					]
				},
				{
					$and: [{
							'receiverId': senderId
						},
						{
							'senderId': receiverId
						},
					]
				}
			]
		}).sort({
			'createdAt': 1
		}).limit(limit).exec();
	},
	/**
	 * lay tin nhắn trong group
	 */
	/**
	 *
	 * @param {*} receiverId
	 * @param {*} limit
	 */
	getMessagesInGroup(receiverId, limit) {
		return this.find({ 'receiverId': receiverId }).sort({ 'createdAt': 1 }).limit(limit).exec();
	}
}
export const MESSAGE_CONVERSATION_TYPE = {
	PERSONAL: 'personal',
	GROUP: 'group',
}
export const MESSAGE_TYPE = {
	TEXT: 'text',
	IMAGE: 'image',
	FILE: 'file',
}
export const MessageModel = mongoose.model('message', MessageSchema) // message để số it khi tạo bảng dữ liệu nó sẽ tự thêm s
