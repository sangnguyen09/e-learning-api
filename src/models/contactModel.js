import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status : {type:Boolean , default:false},
    createdAt:{ type : Number, default : Date.now},
    updatedAt:{ type : Number, default : null},
    deletedAt:{ type : Number, default : null},
    
    
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
            $or:[ // tim tat ca user id vừa là ng gửi kết bạn lưu trong (userId), vừa là người đc gửi kêt bạn lưu trong (contactId)
                {"userId":userId},
                {'contactId': userId}
            ]
        })
    } ,
    /**
     * 
     * @param {string} userId 
     * @param {string} contactId 
     */
    checkExists (userId, contactId) {
        return this.findOne({
            $or : [ // kiểm tra 1 trong 2 thằng đã gửi kết bạn rồi thì thằng còn lại ko dc gửi nữa
                {$and:[
                    {'userId' : userId},
                    {'contactId': contactId} // truowngf hợp a đã gửi kết bạn với b
                ]},
                {$and:[
                    {'userId' : contactId},// truowngf hợp b đã gửi kết bạn với a
                    {'contactId': userId}
                ]},
            ]
        })
    },
    
    /**
     * 
     * @param {string} userId 
     * @param {string} contactId 
     */
    removeRequestContact (userId, contactId) {
        return this.remove({
            $and:[
                {'userId' : userId},
                {'contactId': contactId} 
            ]
        })
    }
    
}
module.exports = mongoose.model('contact', ContactSchema) // contact để số it khi tạo bảng dữ liệu nó sẽ tự thêm s