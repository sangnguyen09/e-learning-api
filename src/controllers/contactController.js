 import {
   contact
 } from '../services/index'
 import {
   validationResult
 } from "express-validator/check";

 let findUsersContact = async (req, res) => {
   let errorArr = [];
   let validationErrors = validationResult(req);

   if (!validationErrors.isEmpty()) {
     let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
     errors.map(item => {
       errorArr = [...errorArr, item.msg]; // dung push vao mang
     });
     //Logging
     // console.log(errorArr)
     return res.status(500).send(errorArr);
   }

   try {
     let currentUserId = req.user._id;
     let keyword = req.params.keyword // trungf voi router
     let users = await contact.findUsersContact(currentUserId, keyword)
     return res.render('main/contact/sections/_findUsersContact', {
       users
     })
   } catch (error) {

   }
 }
 let addNew = async (req, res) => {

   try {
     let currentUserId = req.user._id;
     let contactId = req.body.uid; // uid la data gui len

     let newContact = await contact.addNew(currentUserId, contactId)
     return res.status(200).send({
       success: !!newContact
     }) //!!  sẽ có giá trị là true/false
   } catch (error) {

   }
 }
 let removeRequestContactSent = async (req, res) => {

   try {
     let currentUserId = req.user._id;
     let contactId = req.body.uid; // uid la data gui len
     let removeReq = await contact.removeRequestContactSent(currentUserId, contactId)

     return res.status(200).send({
       success: !!removeReq
     }) //!!  sẽ có giá trị là true/false
   } catch (error) {

   }
 }
 
 let removeRequestContactReceived = async (req, res) => {

   try {
     let currentUserId = req.user._id;
     let contactId = req.body.uid; // uid la data gui len
     let removeReq = await contact.removeRequestContactReceived(currentUserId, contactId)

     return res.status(200).send({
       success: !!removeReq
     }) //!!  sẽ có giá trị là true/false
   } catch (error) {

   }
 }
 let approveRequestContactReceived = async (req, res) => {

   try {
     let currentUserId = req.user._id;
     let contactId = req.body.uid; // uid la data gui len
     let approveReq = await contact.approveRequestContactReceived(currentUserId, contactId)

     return res.status(200).send({
       success: !!approveReq
     }) //!!  sẽ có giá trị là true/false
   } catch (error) {

   }
 }

 let readMoreContacts = async (req, res) => {
   try {
     // get skipnumber by query params
     let skipNumberContacts = +(req.query.skipNumber);
     // get more item
     let newContactUsers = await contact.readMoreContacts(req.user._id, skipNumberContacts)

     return res.status(200).send(newContactUsers)
   } catch (error) {
     return resizeBy.status(500).send(error)
   }
 }
 let readMoreContactsSent = async (req, res) => {
   try {
     // get skipnumber by query params
     let skipNumberContacts = +(req.query.skipNumber);
     // get more item
     let newContactUsers = await contact.readMoreContactsSent(req.user._id, skipNumberContacts)

     return res.status(200).send(newContactUsers)
   } catch (error) {
     return resizeBy.status(500).send(error)
   }
 }
 let readMoreContactsReceived = async (req, res) => {
   try {
     // get skipnumber by query params
     let skipNumberContacts = +(req.query.skipNumber);
     // get more item
     let newContactUsers = await contact.readMoreContactsReceived(req.user._id, skipNumberContacts)

     return res.status(200).send(newContactUsers)
   } catch (error) {
     return resizeBy.status(500).send(error)
   }
 }

 module.exports = {
   findUsersContact,
   addNew,
   removeRequestContactSent,
   removeRequestContactReceived,
   approveRequestContactReceived,
   readMoreContacts,
   readMoreContactsSent,
   readMoreContactsReceived,
 }