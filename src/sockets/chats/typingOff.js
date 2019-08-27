import {
	pushSocketIdToArray,
	emitNotifyToArray,
	removeSocketIdFromArray
} from '../../helpers/socketHelper'
/**
 *
 * @param {*} io from socket.io lib
 */

export const typingOff = (io) => {
	let clients = {}

	io.on('connection', (socket) => {

		// push socketid to array
        let currentUserId = socket.request.user._id
		clients = pushSocketIdToArray(clients, currentUserId, socket.id)
		socket.request.user.chatGroupIds.map(group => {
			clients = pushSocketIdToArray(clients, group._id, socket.id)

		})
			//khi Co cuoc tro chuyen moi thi no cung lang nghe de co the chat dc
			socket.on('new_group_created', (data) => {
				clients = pushSocketIdToArray(clients, data.groupChat._id, socket.id)
			})
			socket.on('member_received_group_chat', (data) => {
				clients = pushSocketIdToArray(clients, data.groupChatId, socket.id)
			 
			});
		socket.on('user_is_not_typing', (data) => {
			if (data.groupId) {
				let response = {
					currentGroupId: data.groupId,
					currentUserId,
					usernameSender:data.usernameSender
				}
				if (clients[data.groupId]) {
					emitNotifyToArray(clients, data.groupId, io, 'res_user_is_not_typing', response)
				}
			}
			if (data.contactId) {
				let response = {
					currentUserId,
					usernameSender:data.usernameSender
				}
				if (clients[data.contactId]) {
					emitNotifyToArray(clients, data.contactId, io, 'res_user_is_not_typing', response)
				}
			}



		});

		socket.on('disconnect', () => { // khi ng dung f5 hoac thoat trinh duyet thi xoa cai socket id do di
			clients = removeSocketIdFromArray(clients, currentUserId, socket);

			socket.request.user.chatGroupIds.map(group => {
				clients = removeSocketIdFromArray(clients, group._id, socket)

			})
		})
	})
}
