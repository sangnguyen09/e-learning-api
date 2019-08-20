import { notification } from "../services";

 export const readMore = async (req, res)=>{
     try {
         // get skipnumber by query params
         let skipNumberNotif = +(req.query.skipNumber);

         // get more item
         let newNotifications = await notification.readMore(req.user._id, skipNumberNotif)

         return res.status(200).send(newNotifications)
     } catch (error) {
         return resizeBy.status(500).send(error)
     }
 }
 export const markAllAsRead = async (req, res)=>{
     try {
         let mark = await notification.markAllAsRead(req.user._id,req.body.targetUsers);

         return res.status(200).send(mark);
     } catch (error) {
         return resizeBy.status(500).send(error)
     }
 }