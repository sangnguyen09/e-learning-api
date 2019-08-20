import mongoose from "mongoose";
import {
  verify
} from "crypto";
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: {
    type: String,
    default: "male"
  },
  phone: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: "avatar-default.jpg"
  },
  role: {
    type: String,
    default: "user"
  },
  local: {
    email: {
      type: String,
      trim: true
    },
    password: String,
    isActive: {
      type: Boolean,
      default: false
    },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: {
      type: String,
      trim: true
    }
  },
  google: {
    uid: String,
    token: String,
    email: {
      type: String,
      trim: true
    } // trim là ko có khoảng trắng
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
  }
});
UserSchema.statics = { // nó chỉ nằm ở phạm vi Schema để giúp chúng ta tìm ra các bản ghi
  createNew(item) {
    return this.create(item); // create có sẵn trong moongoose tạo bản ghi mới
  },
  findByEmail(email) {
    // tra ve Promise
    return this.findOne({
      "local.email": email
    }).exec(); // exec thuc thi
  },
  removeById(id) {
    return this.findByIdAndRemove(id).exec()
  },
  findByToken(token) {
    return this.findOne({
      "local.verifyToken": token
    }).exec();
  },
  verify(token) {
    return this.findOneAndUpdate({
      'local.verifyToken': token
    }, {
      'local.isActive': true,
      'local.verifyToken': null
    }).exec()
  },
  findUserById(id) {
    return this.findById(id).exec()
  },
  findByFacebookUid(uid) {
    return this.findOne({
      "facebook.uid": uid
    }).exec();
  },
  findByGoogleUid(uid) {
    return this.findOne({
      "google.uid": uid
    }).exec();
  },
  updateUser(id,item) { // các hàm update sẽ retun dữ liệu cũ sau khi update
    return this.findByIdAndUpdate(id, item).exec()
  }
  ,
  updatePassword(id,hashedPassword) { // hashedPassword mat khau da dc ma hoa
    return this.findByIdAndUpdate(id, {'local.password':hashedPassword}).exec()
  },
  /**
   * 
   * @param {arr : mang loai tru user id nay da ket banj} deprecatedUserIds 
   * @param {key search} keyword 
   */
  findAllForAddContact (deprecatedUserIds, keyword) {
    return this.find({
        $and:[
          {"_id":{$nin: deprecatedUserIds}} ,//$nin  không nằm trong 
          { 'local.isActive': true},
          {
            $or:[
              {'username' :{'$regex': new RegExp(keyword, 'i') }}, // i là ko phân biệt chữ hoa chữ thường
              {'local.email' :{'$regex': new RegExp(keyword, 'i') }},
              {'facebook.email' :{'$regex': new RegExp(keyword, 'i') }},
              {'google.email' :{'$regex': new RegExp(keyword, 'i') }},
            ]
          }
        ]
    },{_id:1,username:1, address:1, avatar:1}).exec()
  },
  getNormalUserDataById(id) {
    return this.findById(id,{_id:1,username:1, address:1, avatar:1}).exec()
  },
};
UserSchema.methods = { // khi tìm thấy bản ghi rồi thì sẽ sử dụng các method bên trong bản ghi đó
  // retun Promise has result true/false
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password); //this.local.password la mat khau co trong CSDL khi tim thay user trùng email ,password là mat khau ng dung nhap vao form
  }
}
module.exports = mongoose.model("user", UserSchema); // user để số it khi tạo bảng dữ liệu nó sẽ tự thêm s