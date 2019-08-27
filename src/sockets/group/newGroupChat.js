import {
	pushSocketIdToArray,
	emitNotifyToArray,
	removeSocketIdFromArray
} from '../../helpers/socketHelper'
/**
 *
 * @param {*} io from socket.io lib
 */

export const newGroupChat = (io) => {
	let clients = {}

	io.on('connection', (socket) => {

		// push socketid to array
        let currentUserId = socket.request.user._id
		clients = pushSocketIdToArray(clients, currentUserId, socket.id)
		socket.request.user.chatGroupIds.map(group => {
			clients = pushSocketIdToArray(clients, group._id, socket.id)

		})
		socket.on('new_group_created', (data) => {
            clients = pushSocketIdToArray(clients, data.groupChat._id, socket.id)
            let response ={
                groupChat : data.groupChat
            }
            data.groupChat.members.map(member =>{
                if (clients[member.userId] && member.userId != currentUserId) {
                    emitNotifyToArray(clients,member.userId,io,'res_new_group_created',response)
                }
            })
		});
		socket.on('member_received_group_chat', (data) => {
            clients = pushSocketIdToArray(clients, data.groupChatId, socket.id)
         
		});

		socket.on('disconnect', () => { // khi ng dung f5 hoac thoat trinh duyet thi xoa cai socket id do di
			clients = removeSocketIdFromArray(clients, currentUserId, socket);

			socket.request.user.chatGroupIds.map(group => {
				clients = removeSocketIdFromArray(clients, group._id, socket)

			})
		})
	})
}
