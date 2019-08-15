import {validationResult} from 'express-validator/check'
let getLoginRegister = (req,res)=>{  
    return res.render("auth/master");
 }

 let getLogut = (req,res)=>{  
     // do something
 }
 let postRegister = (req,res)=>{  
        let errorArr =[]    
     let validationErrors = validationResult(req)
     if (!validationErrors.isEmpty()) {
         let errors = Object.values(validationErrors.mapped());// laay gia tri cua object gan vao mot cai mang
         errors.map(item =>{
             errorArr =[...errorArr,item.msg]
         })

         console.log(errorArr )
     }
 }

 module.exports = {getLoginRegister, getLogut,postRegister};
