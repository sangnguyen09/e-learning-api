function textAndEmojiChat(divId) {
	$('.emojionearea').unbind('keyup').on('keyup', function (element) {
		let currentEmojione =$(this)
		if ((element.which === 13)) {
			let targetId =$(`#write-chat-${divId}`).data('chat');
			let messageVal =$(`#write-chat-${divId}`).val();
			if (!targetId.length || !messageVal.length) {
				return
			}
			let dataTextEmojiForSend ={
				uid:targetId,
				messageVal
			}
			if ($(`#write-chat-${divId}`).hasClass('chat-in-group')) {
				dataTextEmojiForSend.isChatGroup = true
			}
			// goi send message len server
			$.post('/message/add-new-text-emoji',dataTextEmojiForSend,function (data) {
				//succces
				// bước 1: xử lý tin nhắn trước khi hiển thị
				let messageOfMe =$(`<div class=" bubble  me data-mess-id="${data.message._id}">   </div>`);
				if (dataTextEmojiForSend.isChatGroup) {
					messageOfMe.html(`<img src="/images/users/${data.message.sender.avatar}" title="${data.message.sender.avatar}"
					class="avatar-small">`)

					messageOfMe.text(data.message.text);
					increaaeNumberMessageGroup(divId)
				}else{
					messageOfMe.text(data.message.text);
				}
				let converEmojiMessage =emojione.toImage(messageOfMe.html())
					messageOfMe.html(converEmojiMessage);
				// Bước 2: thêm dũ liệu vào màn hình
				$(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
				nineScrollRight(divId);

				// xoá tin nhắn ở thẻ input
				$(`#write-chat-${divId}`).val('');
				currentEmojione.find('.emojionearea-editor').text('');

				//Bước 4: thay đổi tin nhắn privew và time 
				$(`.person[data-chat=${divId}]`).find('span.time').html(moment(data.message.createdAt).locale('vi').startOf('seconds').fromNow());
				$(`.person[data-chat=${divId}]`).find('span.preview').html(emojione.toImage(data.message.text));

				//Bước 5: di chuyển cuộc hội thoại lên trên đầu:
				$(`.person[data-chat=${divId}]`).on('click.moveConversationToTop',function () {
					let dataToMove=$(this).parent();
					$(this).closest('ul').prepend(dataToMove);//closest tim thang cha gan nhat
					$(this).off('click.moveConversationToTop');
				})
				$(`.person[data-chat=${divId}]`).click()

				// buơc 6: Emit socketio
			}).fail(function (res) {
				//errors
				alertify.notify(res.responseText,'error',7)
			})
		}
	})
}
