import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
	senderId: String,
	receiverId: String,
	conversationType: String,
	messageType: String,
	sender: {
		id: String,
		username: String,
		avatar: String
	},
	receiver: {
		id: String,
		username: String,
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
/**
 * lay sanh saach tin nhan cua cuoc hoi thoai
 */
MessageSchema.statics = {
	getMessages(senderId, receiverId, limit) {
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
	}
}
export const MESSAGE_CONVERSATION_TYPE = {
	PERSONAL: 'personal',
	GROUP: 'group',
}
export const MESSAGE_TYPE = {
	TEXT: 'personal',
	IMAGE: 'image',
	FILE: 'file',
}
export const MessageModel = mongoose.model('message', MessageSchema) // message để số it khi tạo bảng dữ liệu nó sẽ tự thêm s
