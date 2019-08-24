import {
	pushSocketIdToArray,
	emitNotifyToArray,
	removeSocketIdFromArray
} from '../../helpers/socketHelper'
/**
 *
 * @param {*} io from socket.io lib
 */

export const userIsOnline = (io) => {
	let clients = {}

	io.on('connection', (socket) => {

		// push socketid to array
        let currentUserId = socket.request.user._id
		clients = pushSocketIdToArray(clients, currentUserId, socket.id)
		socket.request.user.chatGroupIds.map(group => {
			clients = pushSocketIdToArray(clients, group._id, socket.id)

		})
        // step 1: Emit to user after login or f5
        let listUserOnline =Object.keys(clients)
        socket.emit('server_send_listUsers_online',Object.keys(clients))

        // step 2: Emit tới các thằng khác khi 1 thằng đang nhập
         
        socket.broadcast.emit('server_send_user_online', socket.request.user._id)

		socket.on('disconnect', () => { // khi ng dung f5 hoac thoat trinh duyet thi xoa cai socket id do di
			clients = removeSocketIdFromArray(clients, currentUserId, socket);

			socket.request.user.chatGroupIds.map(group => {
				clients = removeSocketIdFromArray(clients, group._id, socket)

            })
            // step 3: khi người dùng offline 
            socket.broadcast.emit('server_send_user_offline',currentUserId)
        })
	})
}
