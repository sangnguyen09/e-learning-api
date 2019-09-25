import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CourseSchema = new Schema({
	title: {type: String, required : true}, 
    authorId:{
		value: {type: String, required : true},
		label: {type: String, required : true},
	},
    price: {type: Number, required : true},
    pointReview:{
        type: Number,
		default: 0
		
    },
    duration:{
        type: Number,
        default: 10
    },
    description:{type: String, required : true},
    //courseVideoId:String ,
    discount:{type: Number, required : true},
    videoDemo:{type: String, required : true},
    level:{
		value: {type: Number, required : true},
		label: {type: String, required : true},
	},
	category:{
		value: {type: String, required : true},
		label: {type: String, required : true},
	},
	image:{
		type:String,
		required: true,
	},
    numberStudent:{
        type: Number,
        default:0
    },
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
	} 
})

CourseSchema.statics = {
	createNew(item) {
		return this.create(item) // create có sẵn trong moongoose tạo bản ghi mới
	},
	 /**
	  * 
	  * @param {number} page số trang hiện tại
	  * @param {*} limit số phần tử trên trang
	  */
	 getListCoursePerspage(skip, limit) {
		return this.find({}).skip(skip).limit(limit).exec()
	},
	 
	countTotalCourse() {
		return this.count({}).exec()
	},
	 
	findById(id) {
		return this.findOne({'_id':id}).exec()
	},
	deleteCourse(arrId) {
		return this.deleteMany({_id: {$in: arrId } }).exec()
	},
	 
}
module.exports = mongoose.model('course', CourseSchema) // course để số it khi tạo bảng dữ liệu nó sẽ tự thêm s
