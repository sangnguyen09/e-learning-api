import { check } from "express-validator/check";
import { transValidation } from "../../lang/vi";

export const addCourse = [
  check("title", transValidation.course_title_incorrect) // email lấy từ thuộc tính name ở form
    .isLength({ min: 5, max: 100 }),
  check("description", transValidation.course_description_incorrect).isLength({
    min: 5,
    max: 2000
  }),
  check("videoDemo", transValidation.course_video_demo_incorrect)
    .matches(/^https?:\/\/(w{3}\.)?youtube.com\/?/)
    .not()
    .isEmpty()
    .withMessage("Không được để rỗng trường video demo"),
  check("status", transValidation.course_status_incorrect)
    .isBoolean()
    .not()
    .isEmpty()
    .withMessage("Không được để rỗng trường trạng thái"),
  check("price",transValidation.course_price_incorrect)
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("Không được để rỗng trường giá"),
  check("discount", transValidation.course_discount_incorrect)
    .isNumeric()
    .custom((value, { req }) => {
        return value && 0 <= value && value <= 100 // đã kiêm tra rỗng vì có value mới thực hiện vế còn lại
        
    })
   
];
// let updatePassword =[
//     check('currentPassword', transValidation.password_incorrect)
//     .isLength({min:8})
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
//     check('newPassword', transValidation.password_incorrect)
//     .isLength({min:8})
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
//     check('confirmNewPassword', transValidation.password_confirmation_incorrect)
//     .custom((value,{req}) => value === req.body.newPassword)

// ]
