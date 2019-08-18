 import {contact} from '../services/index'
 import { validationResult } from "express-validator/check";

let findUsersContact = async (req, res)=>{
    let errorArr = [];
    let validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
      errors.map(item => {
        errorArr = [...errorArr, item.msg]; // dung push vao mang
      });
      //Logging
     // console.log(errorArr)
      return res.status(500).send(errorArr) ;
    }

    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword // trungf voi router
        let users = await contact.findUsersContact(currentUserId, keyword)
        return res.render('main/contact/sections/_findUsersContact', {users})
    } catch (error) {
        
    }
}
 
module.exports = {
  findUsersContact,
}
