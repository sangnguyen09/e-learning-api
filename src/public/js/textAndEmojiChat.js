function textAndEmojiChat(divId) {
	$('.emojionearea').unbind('keyup').on('keyup', function (element) {
		let currentEmojione = $(this)
		if ((element.which === 13)) {
			let targetId = $(`#write-chat-${divId}`).data('chat');
			let messageVal = $(`#write-chat-${divId}`).val();
			if (!targetId.length || !messageVal.length) {
				return
			}
			let dataTextEmojiForSend = {
				uid: targetId,
				messageVal
			}
			if ($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
				dataTextEmojiForSend.isChatGroup = true
			}
			// goi send message len server
			$.post('/message/add-new-text-emoji', dataTextEmojiForSend, function (data) {
				let dataToEmit = {
					message: data.message
				}
				//succces
				// bước 1: xử lý tin nhắn trước khi hiển thị
				let messageOfMe = $(`<div class=" bubble  me" data-mess-id="${data.message._id}">   </div>`);
				messageOfMe.text(data.message.text);
				let converEmojiMessage = emojione.toImage(messageOfMe.html())

				if (dataTextEmojiForSend.isChatGroup) {
					let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" title="${data.message.sender.avatar}"
					class="avatar-small"/>`
					messageOfMe.html(`${senderAvatar} ${converEmojiMessage}`)
					increaaeNumberMessageGroup(divId)
					dataToEmit.groupId = targetId
				} else {
					messageOfMe.html(converEmojiMessage);
					dataToEmit.contactId = targetId
				}
				// Bước 2: thêm dũ liệu vào màn hình
				$(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
				nineScrollRight(divId);

				// xoá tin nhắn ở thẻ input
				$(`#write-chat-${divId}`).val('');
				currentEmojione.find('.emojionearea-editor').text('');

				//Bước 4: thay đổi tin nhắn privew và time 
				$(`.person[data-chat=${divId}]`).find('span.time').removeClass('message-time-realtime').html(moment(data.message.createdAt).locale('vi').startOf('seconds').fromNow());
				$(`.person[data-chat=${divId}]`).find('span.preview').html(emojione.toImage(data.message.text));

				//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
				$(`.person[data-chat=${divId}]`).on('sangdev.moveConversationToTop', function () {
					let dataToMove = $(this).parent();
					$(this).closest('ul').prepend(dataToMove); //closest tim thang cha gan nhat
					$(this).off('sangdev.moveConversationToTop');
				})
				$(`.person[data-chat=${divId}]`).trigger('sangdev.moveConversationToTop')

				// buơc 6: Emit socketio
				socket.emit('chat_text_emoji', dataToEmit);

				//Bươc 7 : emit remove typing realtime
				typingOff(divId)
			 

			}).fail(function (res) {
				//errors
				alertify.notify(res.responseText, 'error', 7)
			})
		}
	})
}

$(document).ready(function () {
	socket.on('response_chat_text_emoji', function (res) {
		let divId = ''
		// bước 1: xử lý tin nhắn trước khi hiển thị
		let messageOfYou = $(`<div class=" bubble  you" data-mess-id="${res.message._id}">   </div>`);
		messageOfYou.text(res.message.text);
		let converEmojiMessage = emojione.toImage(messageOfYou.html())

		if (res.currentGroupId) {
			let senderAvatar = `<img src="/images/users/${res.message.sender.avatar}" title="${res.message.sender.avatar}"
				class="avatar-small"/>`
			messageOfYou.html(`${senderAvatar} ${converEmojiMessage}`);

			divId = res.currentGroupId;


			if (res.message.sender.id !== $('#dropdown-navbar-user').data('uid')) {
				increaaeNumberMessageGroup(divId)
			}
		} else {
			messageOfYou.html(converEmojiMessage);
			divId = res.currentUserId;
		}

		// Bước 2: thêm dũ liệu vào màn hình
		if (res.message.sender.id !== $('#dropdown-navbar-user').data('uid')) {

			$(`.right .chat[data-chat=${divId}]`).append(messageOfYou);
			nineScrollRight(divId);
			$(`.person[data-chat=${divId}]`).find('span.time').addClass('message-time-realtime')
		}

		// buoc 3 bo qua

		//Bước 4: thay đổi tin nhắn privew và time 
		$(`.person[data-chat=${divId}]`).find('span.time').html(moment(res.message.createdAt).locale('vi').startOf('seconds').fromNow());
		$(`.person[data-chat=${divId}]`).find('span.preview').html(emojione.toImage(res.message.text));

		//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
		$(`.person[data-chat=${divId}]`).on('sangdev.moveConversationToTop', function () {
			let dataToMove = $(this).parent();
			$(this).closest('ul').prepend(dataToMove); //closest tim thang cha gan nhat
			$(this).off('sangdev.moveConversationToTop');
		})
		$(`.person[data-chat=${divId}]`).trigger('sangdev.moveConversationToTop')
	})
})
