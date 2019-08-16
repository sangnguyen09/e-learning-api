import { validationResult } from "express-validator/check";
import {auth} from './../services/index'

let getLoginRegister = (req, res) => {
  return res.render("auth/master", {
    errors: req.flash("errors") ,// lay tu req ben duoi
    success: req.flash("success") 
  });
};

let getLogut = (req, res) => {
  // do something
};

let postRegister = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
    errors.map(item => {
      errorArr = [...errorArr, item.msg]; // dung push vao mang
    });

    req.flash("errors", errorArr);
    return res.redirect("/login-register");
  }
  // thanh cong luu bao CSDL
  try {
   let createUserSuccess =  await auth.register(req.body.email, req.body.gender,req.body.password, req.protocol, req.get("host")) // de thuc hien duoc dang ki thi cần đợi cho service kiểm tra tônf tại của email sau đó nó sé trả về Promise để ở đây sử dụng dc async await
      successArr.push(createUserSuccess)
      req.flash("success", successArr);
      return res.redirect("/login-register");
  } catch (error) {
      errorArr.push(error)
      req.flash("errors", errorArr);
      return res.redirect("/login-register");
  }
};

let verifyAccount = async (req, res)=>{
  let errorArr = [];
  let successArr = [];
    try {
      let verifySuccess= await auth.verifyAccount(req.params.token)
      successArr.push(verifySuccess)
       req.flash("success",successArr) 
       return res.redirect("/login-register");
    } catch (error) {
      errorArr.push(error)
      req.flash("errors", errorArr);
      return res.redirect("/login-register");
    }
}
module.exports = { getLoginRegister, getLogut, postRegister ,verifyAccount };
