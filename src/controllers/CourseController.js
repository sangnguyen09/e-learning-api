import multer from "multer";
import { app } from "../config/app";
import { transErrors, transSuccess, transValidation } from "../../lang/vi";
import randomId from "random-id";
import { user, course } from "../services";
import fsExtra from "fs-extra"; // xu ly file ho tro bat dong bo
import { validationResult } from "express-validator/check";
import Joi from "@hapi/joi"; // validate Object
import { isArray } from "util";
import CourseModel from '../models/courseModel'

let storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.imageCourse_directory);
  },
  filename: (req, file, callback) => {
    let name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    if (name.split(".").length > 1) {
      let tempName = name.split(".");
      tempName.pop(); // bỏ phần cuối extention
      name = tempName.join(".");
    }
    let imageName = `${name}-${Date.now()}`; // nếu sợ trùng thì thêm -${randomId(5, "aA0")}
    callback(null, imageName + "." + file.mimetype.split("/")[1]);
  }
});

export const imageUploadFile = (req, res, next) => {
  multer({
    storage: storageImage,
    limits: {
      fileSize: app.imageCourse_limit_size
    },
    fileFilter: (req, file, cb) => {
      // if the file extension is in our accepted list
      if (
        app.imageCourse_type.some(ext => file.originalname.endsWith("." + ext))
      ) {
        return cb(null, true);
      }

      // otherwise, return error
      return cb(
        new Error(
          "Chỉ cho phép các định dạng " + app.imageCourse_type.join(", ")
        )
      );
    }
  }).single("image")(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.message === "File too large") {
        return res.status(500).json({
          message: transErrors.course_image_size
        });
      }
    } else if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    // ok thi xử lí tiếp controller
    next();
  });
};

export const addNewCourse = async (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
    errors.map(item => {
      errorArr = [...errorArr, item.msg]; // dung push vao mang
    });
    //Logging
    return res.status(400).json({
      message: errorArr[0]
    });
  }

  // ============ Xử lý mục chọn giảng viên ============

  // kiem tra rỗng chọn giảng viên
  let authorId = req.body.authorId ? JSON.parse(req.body.authorId) : '';
  if (authorId === "" || typeof authorId !== "object") {
    return res.status(400).json({
      message: transValidation.course_author_incorrect
    });
  }
  // check giá tri object truyền lên:
  const schemaAuthorId = Joi.object({
    value: Joi.string().required(),
    label: Joi.string().required()
  }).and("value", "label");

  let result1 = schemaAuthorId.validate(authorId);

  if (result1.error) {
    return res.status(400).json({
      message: result1.error.details[0].message
    });
  }

  let checkExitsAuthorId = false;
  if (checkExitsAuthorId) {
    return res.status(400).json({
      message: transValidation.course_author_incorrect
    });
  }

// ============ Xử lý mục chọn trình độ ============
  // kiem tra rỗng chọn danh mục
  let level = req.body.level ? JSON.parse(req.body.level) : '';
  if (level === "" || typeof level !== "object" ||  (typeof level === "object" && level.value !==0 && level.value !== 1)) {
    return res.status(400).json({
      message: transValidation.course_level_incorrect
    });
  }
 
  // check giá tri object truyền lên:
  const schemaLevel = Joi.object({
    value: Joi.number().required(),
    label: Joi.string().required()
  }).and("value", "label");

  let result2 = schemaLevel.validate(level);

  if (result2.error) {
    return res.status(400).json({
      message: result2.error.details[0].message
    });
  }

  let checkExitsLevel = false;
  if (checkExitsLevel) {
    return res.status(400).json({
      message: transValidation.course_level_incorrect
    });
  }
// ============ Xử lý mục chọn danh mục ============
  // kiem tra rỗng chọn danh mục

  let category = req.body.category ? JSON.parse(req.body.category) : '';
  if (req.body.category === "" || typeof category !== "object") {
    return res.status(400).json({
      message: transValidation.course_category_incorrect
    });
  }
  // check giá tri object truyền lên:
  const schemaCategory = Joi.object({
    value: Joi.string().required(),
    label: Joi.string().required()
  }).and("value", "label");

  let result3 = schemaCategory.validate(category);

  if (result3.error) {
    return res.status(400).json({
      message: result3.error.details[0].message
    });
  }

  let checkExitsCategory = false;
  if (checkExitsCategory) {
    return res.status(400).json({
      message: transValidation.course_category_incorrect
    });
  }

 // ============ Xử lý mục hinh ảnh upload ============
  // kiểm tra file upload chưa
  if (!req.file) {
    return res.status(400).json({
      message: transValidation.course_image_incorrect
    });
  }

    // ============ Xử lý Lưu vào cơ sở dữ liệu============
  try {
      //save MongoDb
     let courseNew = await course.createNewCourse(req.body, req.file.filename)
      let result = {...courseNew._doc,image:`${req.protocol}://${req.get("host")}/images/courses/${courseNew._doc.image}`}
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).json({
			message: error
    });
  }
};

export const updateAvatar = (req, res) => {
  imageUploadFile(req, res, async err => {
    if (err) {
      if (err.message) {
        return res.status(500).send(transErrors.image_size);
      }
      return res.status(500).send(err);
    }
    try {
      let updateUserItem = {
        image: req.file.filename,
        updatedAt: Date.now()
      };
      // update user
      let userUpdate = await user.updateUser(req.user._id, updateUserItem);

      // không xoá image của người dùng, vì trong message cần để sử dụng
      //await fsExtra.remove(`${app.image_directory}/${userUpdate.image}`)

      let result = {
        message: transSuccess.user_info_updated,
        imageSrc: `/images/users/${req.file.filename}`
      };
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
};

export const getListCourse = async (req, res) => {

	try {
    const skip = +req.query.skip || 0; // skip
    const limit = +req.query.limit || 10; // Page
    let listCourse = await course.getListCoursePerspage(skip, limit,req.protocol,req.get("host"))
    return res.status(200).send(listCourse)
	} catch (error) {
		if (error) {
			return res.status(403).json({
				message: error
			});
		}
	}
}
export const deleteCourse = async (req, res) => {
  const arrId = req.body.arrId 
  if (isArray(arrId)) {
    try {
      for(let index = 0; index < arrId.length; index++){
          await CourseModel.findById(arrId[index]).then(item =>{
            item && fsExtra.remove(`${app.imageCourse_directory}/${item.image}`)
          }).catch(err=>{
            console.log('err :', err);
            return res.status(403).json({
              message: err
            });
          })
        }

     let result = await course.deleteCourse(arrId)

      return result && res.status(200).send({
        message: transSuccess.removeCourseSuccess(arrId.length)
      })
    } catch (error) {
      console.log(error);
      if (error) {
        return res.status(403).json({
          message: error
        });
      }
    }
  } 
	
}