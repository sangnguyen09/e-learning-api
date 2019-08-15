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
    }
}
module.exports = mongoose.model('contact', ContactSchema) // contact để số it khi tạo bảng dữ liệu nó sẽ tự thêm s