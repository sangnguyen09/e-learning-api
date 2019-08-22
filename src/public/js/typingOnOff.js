function typingOn(divId) {
	let targetId = $(`#write-chat-${divId}`).data('chat');
	let usernameSender = $('#navbar_username').text()
	if ($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
		socket.emit('user_is_typing', {
			groupId: targetId,
			usernameSender
		})
	} else {
		socket.emit('user_is_typing', {
			contactId: targetId,
			usernameSender
		})
	}
}

function typingOff(divId) {
	let targetId = $(`#write-chat-${divId}`).data('chat');
	let usernameSender = $('#navbar_username').text()
	if ($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
		socket.emit('user_is_not_typing', {
			groupId: targetId,
			usernameSender
		})
	} else {
		socket.emit('user_is_not_typing', {
			contactId: targetId,
			usernameSender
		})
	}
}
$(document).ready(function () {
	// mo dang soan tin nhan
	socket.on('res_user_is_typing', function (res) {
		let messageTyping = ` <p style="color: #c70e0e;" data-sender="${res.currentUserId}">${res.usernameSender} đang soạn tin...</p>  `

		if (res.currentGroupId) {
			if (res.currentUserId !== $('#dropdown-navbar-user').data('uid')) {
                let check = $(`.typing-chat[data-chat=${res.currentGroupId}]`).text()
				if (check !== '') {
					return
                }
                
				$(`.typing-chat[data-chat=${res.currentGroupId}]`).html(messageTyping);
				nineScrollRight(res.currentGroupId);
			}
		} else {
			let check = $(`.typing-chat[data-chat=${res.currentUserId}]`).text()
			if (check !== '') {
				return
			}
			$(`.typing-chat[data-chat=${res.currentUserId}]`).html(messageTyping);
			nineScrollRight(res.currentUserId);

		}
	})
	// đóng đang soan tin nhan
	socket.on('res_user_is_not_typing', function (res) {
		if (res.currentGroupId) {
			if (res.currentUserId !== $('#dropdown-navbar-user').data('uid')) {
				let checkTyping = $(`.typing-chat[data-chat=${res.currentGroupId}]`).find(`p[data-sender=${res.currentUserId}]`)
				if (checkTyping.text() !== '') {
                    checkTyping.parent().html('')
					nineScrollRight(res.currentGroupId);
				}
			}
		} else {
            let checkTyping = $(`.typing-chat[data-chat=${res.currentUserId}]`).find(`p[data-sender=${res.currentUserId}]`)
				if (checkTyping.text() !== '') {
                    checkTyping.parent().html('')
					nineScrollRight(res.currentUserId);
				}

		}
	})

})
