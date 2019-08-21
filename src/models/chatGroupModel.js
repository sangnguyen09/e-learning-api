import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
    name: String,
    userAmount :{type:Number, min : 3,max: 100},
    messageAmount: {type:Number, default: 0},
    userId: String,
    members: [
        {userId: String}
    ],
    createdAt:{ type : Number, default : Date.now},
    updatedAt:{ type : Number, default : null},
    deletedAt:{ type : Number, default : null},


})
/**
 * get chat group item by userID and limit
 */
ChatGroupSchema.statics ={
	getChatGroups(userId, limit) {
		return this.find({
			'members':{$elemMatch:{'userId':userId}}
		}).sort({'createdAt':-1}).limit(limit).exec()
	}
}
module.exports = mongoose.model('chat-group', ChatGroupSchema) // chat-group để số it khi tạo bảng dữ liệu nó sẽ tự thêm s
