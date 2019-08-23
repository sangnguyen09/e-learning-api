 function attachmentChat(divId) {
 	$(`#attachment-chat-${divId}`).unbind('change').on('change', function () {
 		let fileData = $(this).prop('files')[0];
 		let limit = 1048576; // byte= 1M

 		if (fileData.size > limit) {
 			alertify.notify("File upalod tối đa cho phép là 1MB", "error", 7)
 			$(this).val(null);
 			return
 		}
 		let targetId = $(this).data('chat');
 		let isChatGroup = false
 		let messageFormData = new FormData();
 		messageFormData.append('my-attachment-chat', fileData);
 		messageFormData.append('uid', targetId);

 		if ($(this).hasClass('chat-in-group')) {
 			messageFormData.append('isChatGroup', true)
 			isChatGroup = true
 		}

 		$.ajax({
 			url: '/message/add-new-attachment',
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
 				let messageOfMe = $(`<div class=" bubble  me bubble-attachment-file" data-mess-id="${data.message._id}">   </div>`);
 				let attachmentChat =
 					`	<a href="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}"
						download="${data.message.file.fileName}">
						${data.message.file.fileName}
					</a>`
 				if (isChatGroup) {
 					let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" title="${data.message.sender.avatar}"
 					class="avatar-small"/>`
 					messageOfMe.html(`${senderAvatar} ${attachmentChat}`)
 					increaaeNumberMessageGroup(divId)
 					dataToEmit.groupId = targetId

 				} else {
 					messageOfMe.html(attachmentChat);
 					dataToEmit.contactId = targetId
 				}

 				// Bước 2: thêm dũ liệu vào màn hình
 				$(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
 				nineScrollRight(divId);

 				// xoá tin nhắn ở thẻ input

 				//Bước 4: thay đổi tin nhắn privew và time 
 				$(`.person[data-chat=${divId}]`).find('span.time').removeClass('message-time-realtime').html(moment(data.message.createdAt).locale('vi').startOf('seconds').fromNow());
 				$(`.person[data-chat=${divId}]`).find('span.preview').html('Tệp đính kèm...');

 				//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
 				$(`.person[data-chat=${divId}]`).on('sangdev.moveConversationToTop', function () {
 					let dataToMove = $(this).parent();
 					$(this).closest('ul').prepend(dataToMove); //closest tim thang cha gan nhat
 					$(this).off('sangdev.moveConversationToTop');
 				})
 				$(`.person[data-chat=${divId}]`).trigger('sangdev.moveConversationToTop')

 				// buơc 6: Emit socketio
 				socket.emit('chat_attachment', dataToEmit);

 				//Bươc 7 : emit remove typing realtime
 				//typingOff(divId)
 				// buoi 8 thêm vào modal image
 				let attachmentChatToAddModal =
 					`<li>
						<a href="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}"
						download="${data.message.file.fileName}">
							${data.message.file.fileName}
						
						</a>
				 </li>`

 				$(`#attachmentssModal_${divId}`).find('ul.list-attachments').append(attachmentChatToAddModal)
 			},
 			error: function (err) {
 				alertify.notify(err.responseText, 'error', 7)
 			}
 		})
 	})
 }

 $(document).ready(function () {
 	socket.on('response_chat_attachment', function (res) {
 		let divId = ''

 		// bước 1: xử lý tin nhắn trước khi hiển thị
 		let messageOfYou = $(`<div class=" bubble  you bubble-attachment-file" data-mess-id="${res.message._id}">   </div>`);
 		messageOfYou.text(res.message.text);

 		let attachmentChat =
 			`	<a href="data:${res.message.file.contentType}; base64, ${bufferToBase64(res.message.file.data.data)}"
				download="${res.message.file.fileName}">
				${res.message.file.fileName}
			</a>`

 		if (res.currentGroupId) {
 			let senderAvatar = `<img src="/images/users/${res.message.sender.avatar}" title="${res.message.sender.avatar}"
 				class="avatar-small"/>`
 			messageOfYou.html(`${senderAvatar} ${attachmentChat}`);

 			divId = res.currentGroupId;


 			if (res.message.sender.id !== $('#dropdown-navbar-user').data('uid')) {
 				increaaeNumberMessageGroup(divId)
 			}
 		} else {
 			messageOfYou.html(attachmentChat);
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
 		$(`.person[data-chat=${divId}]`).find('span.preview').html('Tệp đính kèm...');

 		//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
 		$(`.person[data-chat=${divId}]`).on('sangdev.moveConversationToTop', function () {
 			let dataToMove = $(this).parent();
 			$(this).closest('ul').prepend(dataToMove); //closest tim thang cha gan nhat
 			$(this).off('sangdev.moveConversationToTop');
 		})
 		$(`.person[data-chat=${divId}]`).trigger('sangdev.moveConversationToTop')

 		// buoc 6
 		if (res.message.sender.id !== $('#dropdown-navbar-user').data('uid')) {
 			let attachmentChatToAddModal =
 				`<li>
						<a href="data:${res.message.file.contentType}; base64, ${bufferToBase64(res.message.file.data.data)}"
						download="${res.message.file.fileName}">
							${res.message.file.fileName}
						
						</a>
				 </li>`

 			$(`#attachmentssModal_${divId}`).find('ul.list-attachments').append(attachmentChatToAddModal)
 		}
 	})
 })
