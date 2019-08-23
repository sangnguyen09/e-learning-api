function bufferToBase64(buffer) {
	return btoa(
		new Uint8Array(buffer)
		.reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
}

function imageChat(divId) {
	$(`#image-chat-${divId}`).unbind('change').on('change', function () {
		let fileData = $(this).prop('files')[0];
		let math = ['image/png', 'image/jpg', 'image/jpeg', ];
		let limit = 1048576; // byte= 1M
		if ($.inArray(fileData.type, math) === -1) {
			alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg & png", "error", 7)
			$(this).val(null);
			return
		}
		if (fileData.size > limit) {
			alertify.notify("Ảnh upalod tối đa cho phép là 1MB", "error", 7)
			$(this).val(null);
			return
		}
		let targetId = $(this).data('chat');
		let isChatGroup = false
		let messageFormData = new FormData();
		messageFormData.append('my-image-chat', fileData);
		messageFormData.append('uid', targetId);

		if ($(this).hasClass('chat-in-group')) {
			messageFormData.append('isChatGroup', true)
			isChatGroup = true
		}

		$.ajax({
			url: '/message/add-new-image',
			type: 'post',
			cache: false,
			contentType: false,
			processData: false,
			data: messageFormData,
			success: function (data) {
				let dataToEmit = {
					message: data.message
				}
				// bước 1: xử lý tin nhắn trước khi hiển thị
				let messageOfMe = $(`<div class=" bubble  me bubble-image-file" data-mess-id="${data.message._id}">   </div>`);
				let imageChat = `<img src="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}"
				class="show-image-chat">`

				if (isChatGroup) {
					let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" title="${data.message.sender.avatar}"
					class="avatar-small"/>`
					messageOfMe.html(`${senderAvatar} ${imageChat}`)
					increaaeNumberMessageGroup(divId)
					dataToEmit.groupId = targetId

				} else {
					messageOfMe.html(imageChat);
					dataToEmit.contactId = targetId
				}

				// Bước 2: thêm dũ liệu vào màn hình
				$(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
				nineScrollRight(divId);

				// xoá tin nhắn ở thẻ input

				//Bước 4: thay đổi tin nhắn privew và time 
				$(`.person[data-chat=${divId}]`).find('span.time').removeClass('message-time-realtime').html(moment(data.message.createdAt).locale('vi').startOf('seconds').fromNow());
				$(`.person[data-chat=${divId}]`).find('span.preview').html('Hình ảnh...');

				//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
				$(`.person[data-chat=${divId}]`).on('sangdev.moveConversationToTop', function () {
					let dataToMove = $(this).parent();
					$(this).closest('ul').prepend(dataToMove); //closest tim thang cha gan nhat
					$(this).off('sangdev.moveConversationToTop');
				})
				$(`.person[data-chat=${divId}]`).trigger('sangdev.moveConversationToTop')

				// buơc 6: Emit socketio
				socket.emit('chat_image', dataToEmit);

				//Bươc 7 : emit remove typing realtime
				//typingOff(divId)
				// buoi 8 thêm vào modal image
				let imageChatToAddModal = `<img src="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}"  >`
				$(`#imagesModal_${divId}`).find('div.all-images').append(imageChatToAddModal)
			},
			error: function (err) {
				alertify.notify(err.responseText, 'error', 7)
			}
		})
	})
}

$(document).ready(function () {
	socket.on('response_chat_image', function (res) {
		let divId = ''
		// bước 1: xử lý tin nhắn trước khi hiển thị
		let messageOfYou = $(`<div class=" bubble  you bubble-image-file" data-mess-id="${res.message._id}">   </div>`);
		messageOfYou.text(res.message.text);

		let imageChat = `<img src="data:${res.message.file.contentType}; base64, ${bufferToBase64(res.message.file.data.data)}"
		class="show-image-chat">`

		if (res.currentGroupId) {
			let senderAvatar = `<img src="/images/users/${res.message.sender.avatar}" title="${res.message.sender.avatar}"
				class="avatar-small"/>`
			messageOfYou.html(`${senderAvatar} ${imageChat}`);

			divId = res.currentGroupId;


			if (res.message.sender.id !== $('#dropdown-navbar-user').data('uid')) {
				increaaeNumberMessageGroup(divId)
			}
		} else {
			messageOfYou.html(imageChat);
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
		$(`.person[data-chat=${divId}]`).find('span.preview').html('Hình ảnh...');

		//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
		$(`.person[data-chat=${divId}]`).on('sangdev.moveConversationToTop', function () {
			let dataToMove = $(this).parent();
			$(this).closest('ul').prepend(dataToMove); //closest tim thang cha gan nhat
			$(this).off('sangdev.moveConversationToTop');
		})
		$(`.person[data-chat=${divId}]`).trigger('sangdev.moveConversationToTop')

		// buoi 8 thêm vào modal image
		if (res.message.sender.id !== $('#dropdown-navbar-user').data('uid')) {
			let imageChatToAddModal = `<img src="data:${res.message.file.contentType}; base64, ${bufferToBase64(res.message.file.data.data)}"  >`
			$(`#imagesModal_${divId}`).find('div.all-images').append(imageChatToAddModal)
		}
	})
})
