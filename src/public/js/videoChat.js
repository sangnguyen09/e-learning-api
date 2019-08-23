function videoChat(divId) {
	$(`#video-chat-${divId}`).unbind('click').on('click', function () {
		let targetId = $(this).data('chat');
		let callerName = $('#navbar_username').text()

		let dataToEmit = {
			listenerId: targetId,
			callerName: callerName
		}

		//Bước 1: của Người gọi, kiêm tra ng kia có online
		socket.emit('caller_check_listener_isOnline', dataToEmit)
	})
}

$(document).ready(function () {
	// Buoc 2  cuả caller
	socket.on('server_send_listener_offline', function () {
		alertify.notify('Người dùng này hiện không trực tuyến.', 'warning', 7)
	})

	// Buoc 3  Của listener
	let getPeerId = ''
	const peer = new Peer(); // da link ở master
	peer.on('open', function (peerId) {
		getPeerId = peerId
	})
	socket.on('server_request_peerId_of_listener', function (res) {

		let listenerName = $('#navbar_username').text()
		let dataToEmit = {
			callerId: res.callerId,
			listenerId: res.listenerId,
			callerName: res.callerName,
			listenerName,
			listenerPeerId: getPeerId,
		}

		// Buoc 4: listener
		socket.emit('listener_emit_peerId_to_server', dataToEmit)
	})

	//Buoc 5 ; of caller
	socket.on('server_send_peerId_of_listener_to_caller', function (res) {

		let dataToEmit = {
			callerId: res.callerId,
			listenerId: res.listenerId,
			callerName: res.callerName,
			listenerName: res.listenerName,
			listenerPeerId: res.listenerPeerId,
		}

		// Buoc 6: of call
		socket.emit('caller_request_call_to_server', dataToEmit);

		let timeInterval;
		Swal.fire({
			title: `Đang gọi cho &nbsp; <span style="color:#2ecc71">${res.listenerName} </span>&nbsp;<i class="fa fa-volume-control-phone"></i> `,
			html: `Thời gian: <strong style="color:#d43f3a" ></strong> giây. <br/> <br/>
            
                    <button id="btn-cancel-call" class="btn btn-danger">Huỷ cuộc gọi </button>
            `,
			backdrop: 'rgba(85,85,85,.4)',
			width: "52rem",
			allowOutsideClick: false,
			timer: 30000, // 30s
			onBeforeOpen: () => {
				$('#btn-cancel-call').unbind('click').on('click', function () {
					Swal.close()
					clearInterval(timeInterval)
					// Bước 7: of caller
					socket.emit('caller_cancle_request_call_to_server', dataToEmit)
				})
				Swal.showLoading();
				timeInterval = setInterval(() => {
					Swal.getContent().querySelector('strong').textContent = Math.ceil(Swal.getTimerLeft() / 1000)
				}, 1000);
			},
			onOpen: () => {
				// Bước 12 của caller
				socket.on('server_send_reject_call_to_caller', function (res) {
					Swal.close()
					clearInterval(timeInterval)

					Swal.fire({
						type: "info",
						title: `<span style="color:#2ecc71">${res.listenerName} </span>&nbsp; hiện tại không thể nghe máy`,
						backdrop: 'rgba(85,85,85,.4)',
						width: "52rem",
						allowOutsideClick: false,
						confirmButtonColor: '#2ECC71',
						confirmButtonText: 'Xác nhận',
					})
				})

				// Bước 13: của caller
				socket.on('server_send_accept_call_to_caller', function (res) {
					Swal.close()
					clearInterval(timeInterval)

					console.log('ck');
				})
			},
			onClose: () => {
				clearInterval(timeInterval)
			}

		}).then((result) => {
			return
		})
	})
	//Bước 8 of Listener
	socket.on('server_send_request_call_to_listener', function (res) {
		let dataToEmit = {
			callerId: res.callerId,
			listenerId: res.listenerId,
			callerName: res.callerName,
			listenerName: res.listenerName,
			listenerPeerId: res.listenerPeerId,
		}
		let timeInterval;
		Swal.fire({
			title: `<span style="color:#2ecc71">${res.listenerName} </span>&nbsp; Muốn trò chuyện video với bạn &nbsp;<i class="fa fa-volume-control-phone"></i> `,
			html: `Thời gian: <strong style="color:#d43f3a" ></strong> giây. <br/> <br/>
            
                    <button id="btn-reject-call" class="btn btn-danger">Từ chối </button>
                    <button id="btn-accept-call" class="btn btn-success">Đồng ý </button>
            `,
			backdrop: 'rgba(85,85,85,.4)',
			width: "52rem",
			allowOutsideClick: false,
			timer: 30000, // 30s
			onBeforeOpen: () => {
				$('#btn-reject-call').unbind('click').on('click', function () {
					Swal.close()
					clearInterval(timeInterval)
					// Bước 10: of listener từ chối gọi
					socket.emit('listener_reject_request_call_to_server', dataToEmit)
				})
				$('#btn-accept-call').unbind('click').on('click', function () {
					Swal.close()
					clearInterval(timeInterval)
					// Bước 11: of listener châps nhận goi video
					socket.emit('listener_accept_request_call_to_server', dataToEmit)
				})
				Swal.showLoading();
				timeInterval = setInterval(() => {
					Swal.getContent().querySelector('strong').textContent = Math.ceil(Swal.getTimerLeft() / 1000)
				}, 1000);
			},
			onOpen: () => {
				// bước 9: listener; caller huy goi
				socket.on('server_send_cancel_request_call_to_listener', function (res) {
					Swal.close()
					clearInterval(timeInterval)
                })
                
				// Bước 14: của listener
				socket.on('server_send_accept_call_to_caller', function (res) {
					Swal.close()
					clearInterval(timeInterval)

					console.log('listen ck');
				})
			},
			onClose: () => {
				clearInterval(timeInterval)
			}

		}).then((result) => {
			return
		})
	})

})
