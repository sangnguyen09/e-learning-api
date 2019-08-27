import {   chatGroup } from "../services/index";
import { validationResult } from "express-validator/check";

export const addNew = async (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
    errors.map(item => {
      errorArr = [...errorArr, item.msg]; // dung push vao mang
    });
    //Logging
    return res.status(500).send(errorArr);
  }

  try {
    let currentUserId = req.user._id;
  
    let newChatGroup= await chatGroup.addNew(currentUserId, req.body.groupChatName,req.body.arrayIds);
    return res.status(200).send({newChatGroup});  
  } catch (error) {}
};

 
