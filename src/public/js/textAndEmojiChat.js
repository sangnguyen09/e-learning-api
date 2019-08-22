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
			console.log(dataTextEmojiForSend)
		}
	})
}
