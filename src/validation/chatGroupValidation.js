import {check} from "express-validator/check"
import   {transValidation}    from "../../lang/vi"

 
let chatGroupUsers = [
    // check('arrayIds', transValidation.chat_group_users)  
    // .custom((value,{req}) => req.body.arrayIds.length > 2 ),
    check('groupChatName', transValidation.chat_group_name)  
    .isLength({min: 5,max:30})
]

 
module.exports= {
    chatGroupUsers
}
