import mongoose from "mongoose";
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  userName: {type: String, required : true},
  fullName: {type: String, required : true},
  phone: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: "avatar-default.jpg"
  },
  role: {
    type: String,
    default: "user"
  },
  email: {
    type: String,
   // trim là ko có khoảng trắng
    trim: true,
    required:true
  },
  local: {
    password: {type: String, required : true},
    verifyToken: String
  },
  forgotPasswordToken:{
    type:String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false
  },
  facebook: {
    uid: String,
    token: String,
  },
  google: {
    uid: String,
    token: String,
  },
  refreshToken:{
    type: String,
    default: null
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
      "email": email
    }).exec(); // exec thuc thi
  },
  findUserByJWT(id) {
    // tra ve Promise
    return this.findById(id,{'local.password':0}).exec(); // exec thuc thi
  },
  
  removeById(id) {
    return this.findByIdAndRemove(id).exec()
  },
  checkRefreshTokenByUser(id, refreshToken) {
    // tra ve Promise
    return this.findOne({
      $and:[
         {"_id":id},
         {"refreshToken":refreshToken}
      ]
    },{'local.password':0}).exec(); // exec thuc thi
  },
  saveForgotPasswordToken(id,token) { // lưu lại mã token để kiểm tra khi người dùng muốn lấy lại mật khẩu  
    return this.findByIdAndUpdate(id, {'forgotPasswordToken':token}).exec()
  },
  findForgotPasswordToken(token) {// tim kiếm xem có tồn tại token mà người dùng gửi lên khi lấy lại mật khẩu
    return this.findOne({
      "forgotPasswordToken": token
    }).exec();
  },
  saveRefreshToken(id,refreshToken) { // lưu lại mã refreshToken để sau này tạo lại mã Token  
    return this.findByIdAndUpdate(id, {'refreshToken':refreshToken}).exec()
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
      'isActive': true,
      'local.verifyToken': null
    }).exec()
  },
  findUserByIdToUpdatePassword(id) {
    return this.findById(id).exec()
  },
  findUserByIdForSessionToUse(id) {
    return this.findById(id,{'local.password':0}).exec()
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
  /**
   *find all user to group chat
   * @param {arr} friendIds
   * @param {key search} keyword
   */
  findAllToAddGroupChat (friendIds, keyword) {
    return this.find({
        $and:[
          {"_id":{$in: friendIds}} ,//$in nằm trong
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
