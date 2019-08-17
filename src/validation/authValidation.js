import {check} from "express-validator/check"
import   {transValidation}    from "../../lang/vi"

let register = [
    check('email', transValidation.email_incorrect) // email lấy từ thuộc tính name ở form
    .isEmail()
    .trim(),
    check('gender', transValidation.gender_incorrect)// gender lấy từ thuộc tính name ở form, đặt tên j thì ở đây ghi đúng như thế
    .isIn(['male', 'female']),
    check('password', transValidation.password_incorrect)
    .isLength({min: 8})
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation", transValidation.password_confirmation_incorrect)
    .custom((value,{req}) => value === req.body.password )
]

module.exports= {
    register
}
