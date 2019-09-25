import {check} from "express-validator/check"
import   {transValidation}    from "../../lang/vi"

export const register = [
    check('email', transValidation.email_incorrect) // email lấy từ thuộc tính name ở form
    .isEmail()
    .trim(),
    check('fullName', transValidation.fullname_incorrect) 
    .isLength({min: 5, max:30}),
    check('phone', transValidation.phone_incorrect) 
    .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/),
    check('password', transValidation.password_incorrect)
    .isLength({min: 8})
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("passwordConfirm", transValidation.password_confirmation_incorrect)
    .custom((value,{req}) => value === req.body.password )
]
 

 
export const refreshToken = [
    check('refreshToken', transValidation.refresh_token_incorrect)  
    .isLength({min:50})
    .matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
]
export const forgotPassword = [
    check('email', transValidation.email_incorrect) // email lấy từ thuộc tính name ở form
    .isEmail()
    .trim(),
]
export const resetPassword = [
    check('password', transValidation.password_incorrect)
    .isLength({min: 8})
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("passwordConfirm", transValidation.password_confirmation_incorrect)
    .custom((value,{req}) => value === req.body.password ),
    check('tokenReset', transValidation.token_incorrect)
    .isLength({min:30, max:45})
]
export const getUserInfo = [
    check('token', transValidation.token_incorrect)  
    .isLength({min:50})
    // .matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
]


 