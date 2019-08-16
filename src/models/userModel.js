import mongoose from "mongoose";
import { verify } from "crypto";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "male" },
  phone: { type: Number, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar.png" },
  role: { type: String, default: "user" },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true } // trim là ko có khoảng trắng
  },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});
UserSchema.statics = {
  createNew(item) {
    return this.create(item); // create có sẵn trong moongoose tạo bản ghi mới
  },
  findByEmail(email) {
    // tra ve Promise
    return this.findOne({ "local.email": email }).exec(); // exec thuc thi
  },
  removeById(id) {
	  return this.findByIdAndRemove(id).exec()
  },
  findByToken(token){
	return this.findOne({ "local.verifyToken": token }).exec();
  },
  verify(token) {
		return this.findOneAndUpdate(
			{'local.verifyToken': token},
			{
				'local.isActive':true,'local.verifyToken':null
			}
		).exec()
  }
};
module.exports = mongoose.model("user", UserSchema); // user để số it khi tạo bảng dữ liệu nó sẽ tự thêm s