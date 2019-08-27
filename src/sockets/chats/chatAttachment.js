import {
  pushSocketIdToArray,
  emitNotifyToArray,
  removeSocketIdFromArray
} from "../../helpers/socketHelper";
/**
 *
 * @param {*} io from socket.io lib
 */

export const chatAttachment = io => {
  let clients = {};

  io.on("connection", socket => {
    // push socketid to array
    let currentUserId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentUserId, socket.id);
    socket.request.user.chatGroupIds.map(group => {
      clients = pushSocketIdToArray(clients, group._id, socket.id);
    });
    //khi Co cuoc tro chuyen moi thi no cung lang nghe de co the chat dc
    socket.on("new_group_created", data => {
      clients = pushSocketIdToArray(clients, data.groupChat._id, socket.id);
    });
    socket.on("member_received_group_chat", data => {
      clients = pushSocketIdToArray(clients, data.groupChatId, socket.id);
    });
    socket.on("chat_attachment", data => {
      if (data.groupId) {
        let response = {
          currentGroupId: data.groupId,
          message: data.message
        };
        if (clients[data.groupId]) {
          emitNotifyToArray(
            clients,
            data.groupId,
            io,
            "response_chat_attachment",
            response
          );
        }
      }
      if (data.contactId) {
        let response = {
          currentUserId: socket.request.user._id,
          message: data.message
        };
        if (clients[data.contactId]) {
          emitNotifyToArray(
            clients,
            data.contactId,
            io,
            "response_chat_attachment",
            response
          );
        }
      }
    });

    socket.on("disconnect", () => {
      // khi ng dung f5 hoac thoat trinh duyet thi xoa cai socket id do di
      clients = removeSocketIdFromArray(clients, currentUserId, socket);

      socket.request.user.chatGroupIds.map(group => {
        clients = removeSocketIdFromArray(clients, group._id, socket);
      });
    });
  });
};
