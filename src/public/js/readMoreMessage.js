function readMoreMessage() {
	$('.right .chat').scroll(function(){
		// get the first message
		let firstMessage =$(this).find('.bubble:first');

		// get position of fisrt message
		let currentOffset = firstMessage.offset().top - $(this).scrollTop();
		if ($(this).scrollTop() === 0) {
			let messageLoading = ` <img src="images/chat/message-loading.gif" class="message-loading"/>`
			$(this).prepend(messageLoading);

			let targetId = $(this).data('chat');
			let skipMessage =$(this).find('div.bubble').length;
			let chatInGroup =$(this).hasClass('chat-in-group') ? true : false;
			console.log(chatInGroup);
			let that = $(this);
			$.get(`/message/read-more?skipMessage=${skipMessage}&targetId=${targetId}&chatInGroup=${chatInGroup}`, function(data){
				if (data.rightSideData.trim() === '') {
					alertify.notify("Bạn không còn tin nhắn nào để xem!", 'error', 7)
					that.find('img.message-loading').remove()
					return
				}
				// Buoc 1: handle rightSide
				$(`.right .chat[data-chat=${targetId}]`).prepend(data.rightSideData);
				//Buoc 2 prevent Scroll
				$(`.right .chat[data-chat=${targetId}]`).scrollTop(firstMessage.offset().top - currentOffset)
				// Buoc 3: convert Emoji
				convertEmoji()
				// Buoc 4 handle image Modal
				$(`#imageModal_${targetId}`).find('div.all-images').append(data.imageModalData);
				// Buoc 5: call grid photo
				gridPhotos(5)

				//Buoc 6 : handle attacmentmodal
				$(`#attactmentModal_${targetId}`).find('ul.list-attachments').append(data.attactmentModalData);

				// Buoc 7: remove message loading
				that.find('img.message-loading').remove()
			})
		}
	})
}

$(document).ready(function () {
 readMoreMessage()
})
