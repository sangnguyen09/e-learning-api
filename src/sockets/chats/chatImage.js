import {
	pushSocketIdToArray,
	emitNotifyToArray,
	removeSocketIdFromArray
} from '../../helpers/socketHelper'
/**
 *
 * @param {*} io from socket.io lib
 */

export const chatImage = (io) => {
	let clients = {}

	io.on('connection', (socket) => {

		// push socketid to array
        let currentUserId = socket.request.user._id
		clients = pushSocketIdToArray(clients, currentUserId, socket.id)
		socket.request.user.chatGroupIds.map(group => {
			clients = pushSocketIdToArray(clients, group._id, socket.id)

		})
		socket.on('chat_image', (data) => {
			if (data.groupId) {
				let response = {
					currentGroupId: data.groupId,
					message: data.message
				}
				if (clients[data.groupId]) {
					emitNotifyToArray(clients, data.groupId, io, 'response_chat_image', response)
				}
			}
			if (data.contactId) {
				let response = {
					currentUserId: socket.request.user._id,
					message: data.message
				}
				if (clients[data.contactId]) {
					emitNotifyToArray(clients, data.contactId, io, 'response_chat_image', response)
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
