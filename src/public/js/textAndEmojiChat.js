function textAndEmojiChat(divId) {
	$('.emojionearea').unbind('keyup').on('keyup', function (element) {
		if ((element.which === 13)) {
			let targetId =$(`#write-chat-${divId}`).data('chat');
			let messageVal =$(`#write-chat-${divId}`).val();
			console.log(targetId);
			console.log(messageVal);
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
				console.log(data.message );
			}).fail(function (res) {
				//errors
				alertify.notify(res.responseText,'error',7)
			})
		}
	})
}
