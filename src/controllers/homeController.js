import { notification, contact, message } from "../services/index";
import {
  bufferToBase64,
  lastItemOfArray,
  convertTimestampToHumanTime
} from "../helpers/clientHelper";
import request from "request";

let getICETurnServer = () => {
  return new Promise(async (resolve, reject) => {
    // // Node Get ICE STUN and TURN list
    // let o = {
    //   format: "urls"
    // };

    // let bodyString = JSON.stringify(o);
    // let options = {
    //   url: "https://global.xirsys.net/_turn/awesome-chat",
    //   //   host: "global.xirsys.net",
    //   //   path: "/_turn/awesome-chat",
    //   method: "PUT",
    //   headers: {
    //     Authorization:
    //       "Basic " +
    //       Buffer.from("sang7817:0cf5e674-c682-11e9-82b3-0242ac110007").toString(
    //         "base64"
    //       ),
    //     "Content-Type": "application/json",
    //     "Content-Length": bodyString.length
    //   }
    // };
    // // call a request to get ICE list of tun server
    // request(options,(error, response, body) => {
    //     if (error) {
    //         console.log(error);
    //         return reject(error)
    //     }
    //     let bodyJson  = JSON.parse(body)
    //     resolve(bodyJson.v.iceServers)
    // })


    resolve([])
  });
};

let getHome = async (req, res) => {
  // only 10 items one time
  let notifications = await notification.getNotifications(req.user._id);
  // get amount notiificaitons unread
  let countNofifUnread = await notification.countNofifUnread(req.user._id);

  // get contacts 10 item one time
  let contacts = await contact.getContacts(req.user._id);

  // get contacts sent 10 item one time
  let contactsSent = await contact.getContactsSent(req.user._id);

  // get contacts received 10 item one time
  let contactsReceived = await contact.getContactsReceived(req.user._id);

  // count contacts
  let countAllContacts = await contact.countAllContacts(req.user._id);
  let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
  let countAllContactsReceived = await contact.countAllContactsReceived(
    req.user._id
  );

  let getAllConversationItems = await message.getAllConversationItems(
    req.user._id
  );

  //lấy danh sách tin nhắn theo cuộc hội thoại tối da 30 tin nhắn
  let allConversationsWithMessages =  getAllConversationItems.allConversationMessages;

//  lấy danh sách ICE từ tun server
 let iceServerList = await getICETurnServer()


  return res.render(
    "main/home/home", // been file cau hình đã định nghĩa đường dẫn src/view
    {
      errors: req.flash("errors"), // lay tu req ben duoi
      success: req.flash("success"),
      user: req.user,
      notifications,
      countNofifUnread,
      contacts,
      contactsSent,
      contactsReceived,
      countAllContacts,
      countAllContactsReceived,
      countAllContactsSent,
      allConversationsWithMessages,
      bufferToBase64,
      lastItemOfArray,
      convertTimestampToHumanTime,
      iceServerList: JSON.stringify(iceServerList),
    }
  );
};

module.exports = {
  getHome
};
