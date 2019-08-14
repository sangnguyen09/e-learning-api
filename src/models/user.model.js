import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    gender : {type:String , default:"male"},
    phone:{type:Number , default: null},
    address:{type:String , default: null},
    avatar:{type:String , default: 'avatar.png'},
    role:{type:String , default: 'user'},
    local:{
        email:{type :String, trim: true},
        password:String,
        isActive: {type: Boolean, default:false},
        verifyToken: String
    },
    facebook:{
        uid: String,
        token:String,
        email : {type : String, trim: true}
    },
    google:{
        uid: String,
        token:String,
        email : {type : String, trim: true} // trim là ko có khoảng trắng
    },
    createdAt:{ type : Number, default : Date.now},
    updatedAt:{ type : Number, default : null},
    deletedAt:{ type : Number, default : null},
    
    
})
module.exports = mongoose.model('user', UserSchema) // user để số it khi tạo bảng dữ liệu nó sẽ tự thêm s