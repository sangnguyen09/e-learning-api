$(document).ready(function () {
	$('#load_more_all_chat').bind('click', function () {
		let skipPersonal = $('#all-chat').find('li:not(.group-chat)').length;
		let skipGroup = $('#all-chat').find('li.group-chat').length;

		$('#load_more_all_chat').parent().css('display', 'none')
		$('.lds-ripple').css('display', 'inline-block')

		$.get(`/message/read-more-all-chat?skipPersonal=${skipPersonal}&skipGroup=${skipGroup}`, function (data) {
			if (data.leftSideData.trim() === '') {
				alertify.notify("Bạn không còn cuộc trò chuyện nào để xem!", 'error', 7)
				$('#load_more_all_chat').parent().css('display', 'block')
				$('.lds-ripple').css('display', 'none')
				return
			}

			//Step1 handle leftSide
			$('#all-chat').find('ul').append(data.leftSideData);

            // step 2: scroll left
            resizeNineScrollLeft()
			nineScrollLeft();

			//Buoc 3: handle rightSide
			$('#screen-chat').append(data.rightSideData);

			// buoc 4: call func screenchat
			changeSreenChat();

			// Buoc 5: Conver emoji
			convertEmoji();

			// Buoc 6: handle ImageModal
			$('body').append(data.imageModalData);

			// Buoc 7: call func gridphoto
			gridPhotos()

			//Buoc 8 : handle attactment
			$('body').append(data.attactmentModalData);

			//Buoc 9: Check online

			socket.emit('check-status')

			$('#load_more_all_chat').parent().css('display', 'block')
			$('.lds-ripple').css('display', 'none')
		})
	})
})
