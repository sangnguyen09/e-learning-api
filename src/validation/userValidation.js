import {check} from "express-validator/check"
import   {transValidation}    from "../../lang/vi"

let updateInfo = [
    check('username', transValidation.update_username) // email lấy từ thuộc tính name ở form
    .optional() // co hoac khong co
    .isLength({min:3, max: 17})
    .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
     check('gender', transValidation.update_gender)
     .optional()
     .isIn(['male',['female']]),
     check('address', transValidation.update_address)
     .optional()
     .isLength({min:3,max:30}),
     check("phone", transValidation.update_phone)
     .optional()
     .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/)

]

module.exports= {
    updateInfo
}
