import {
	pushSocketIdToArray,
	emitNotifyToArray,
	removeSocketIdFromArray
} from '../../helpers/socketHelper'
/**
 *
 * @param {*} io from socket.io lib
 */

export const chatVideo = (io) => {
	let clients = {}

	io.on('connection', (socket) => {

		// push socketid to array
        let currentUserId = socket.request.user._id
		clients = pushSocketIdToArray(clients, currentUserId, socket.id)
		socket.request.user.chatGroupIds.map(group => {
			clients = pushSocketIdToArray(clients, group._id, socket.id)

		})
		socket.on('caller_check_listener_isOnline', (data) => {
		 
			if (clients[data.listenerId]) {
				//online
				let response ={
					callerId: socket.request.user._id,
					listenerId: data.listenerId,
					callerName: data.callerName
				}
				emitNotifyToArray(clients, data.listenerId, io,'server_request_peerId_of_listener',response)
			}else{
				//offiline
				socket.emit('server_send_listener_offline');
			}

		});
		socket.on('listener_emit_peerId_to_server', (data) => {
		 
			 let response ={
				callerId: data.callerId,
				listenerId: data.listenerId,
				callerName: data.callerName,
				listenerName:data.listenerName,
				listenerPeerId : data.listenerPeerId,
			 }
			if (clients[data.callerId] ) {
				emitNotifyToArray(clients, data.callerId, io,'server_send_peerId_of_listener_to_caller',response)
				
			}
		});
		socket.on('caller_request_call_to_server', (data) => {
		 
			 let response ={
				callerId: data.callerId,
				listenerId: data.listenerId,
				callerName: data.callerName,
				listenerName:data.listenerName,
				listenerPeerId : data.listenerPeerId,
			 }
			if (clients[data.listenerId] ) {
				emitNotifyToArray(clients, data.listenerId, io,'server_send_request_call_to_listener',response)
				
			}
		});
		socket.on('caller_cancle_request_call_to_server', (data) => {
		 
			 let response ={
				callerId: data.callerId,
				listenerId: data.listenerId,
				callerName: data.callerName,
				listenerName:data.listenerName,
				listenerPeerId : data.listenerPeerId,
			 }
			if (clients[data.listenerId] ) {
				emitNotifyToArray(clients, data.listenerId, io,'server_send_cancel_request_call_to_listener',response)
				
			}
		});
		socket.on('listener_reject_request_call_to_server', (data) => {
		 
			 let response ={
				callerId: data.callerId,
				listenerId: data.listenerId,
				callerName: data.callerName,
				listenerName:data.listenerName,
				listenerPeerId : data.listenerPeerId,
			 }
			if (clients[data.callerId] ) {
				emitNotifyToArray(clients, data.callerId, io,'server_send_reject_call_to_caller',response)
				
			}
		});
		socket.on('listener_accept_request_call_to_server', (data) => {
		 
			 let response ={
				callerId: data.callerId,
				listenerId: data.listenerId,
				callerName: data.callerName,
				listenerName:data.listenerName,
				listenerPeerId : data.listenerPeerId,
			 }
			if (clients[data.callerId] ) {
				emitNotifyToArray(clients, data.callerId, io,'server_send_accept_call_to_caller',response)
				
			}
			if (clients[data.listenerId] ) {
				emitNotifyToArray(clients, data.listenerId, io,'server_send_accept_call_to_caller',response)
				
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
