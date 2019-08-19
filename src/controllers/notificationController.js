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