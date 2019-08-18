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
let addNew = async (req, res)=>{

    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid; // uid la data gui len

        let newContact = await contact.addNew(currentUserId, contactId)
        return res.status(200).send({success: !!newContact})//!!  sẽ có giá trị là true/false
    } catch (error) {
        
    }
}
let removeRequestContact = async (req, res)=>{

    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid; // uid la data gui len
        let removeReq = await contact.removeRequestContact(currentUserId, contactId)
    
        return res.status(200).send({success: !!removeReq})//!!  sẽ có giá trị là true/false
    } catch (error) {
        
    }
}
 
module.exports = {
  findUsersContact,
  addNew,
  removeRequestContact,
}
