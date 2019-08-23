/**
 * Created by https://trungquandev.com's author on 25/02/2018.
 */
// const socket =io();
var socket = io.connect('http://localhost:8017');

function nineScrollLeft() {
	$('.left').niceScroll({
		smoothscroll: true,
		horizrailenabled: false,
		cursorcolor: '#ECECEC',
		cursorwidth: '7px',
		scrollspeed: 50
	});
}

function nineScrollRight(divId) {
	$(`.right .chat[data-chat=${divId}]`).niceScroll({
		smoothscroll: true,
		horizrailenabled: false,
		cursorcolor: '#ECECEC',
		cursorwidth: '7px',
		scrollspeed: 50
	});
	$(`.right .chat[data-chat=${divId}]`).scrollTop($(`.right .chat[data-chat=${divId}]`)[0].scrollHeight);
}

function enableEmojioneArea(divId) {
	$(`#write-chat-${divId}`).emojioneArea({
		standalone: false,
		pickerPosition: 'top',
		filtersPosition: 'bottom',
		tones: false,
		autocomplete: false,
		inline: true,
		hidePickerOnBlur: true,
		search: false,
		shortnames: false,
		events: {
			keyup: function (editor, event) {
				// gan giá trị thay đổi vào thẻ input
				$(`#write-chat-${divId}`).val(this.getText());
				//bật chưcs năng đang soạn tin
				if ((event.which === 13)) {// nếu bấm enter thì tức là co tin nhắn -> xoá typing đi
					return
				}
				typingOn(divId);
			},
			// bật lắng nghe DOM cho việc chat tin nhắn văn bản + emoji
			click: function () {
				textAndEmojiChat(divId)
			},
			blur: function () {
				// tắt chuức năng đang soạn tin nhắn
				typingOff(divId)
			}
		},
	});
	$('.icon-chat').bind('click', function (event) {
		event.preventDefault();
		$('.emojionearea-button').click();
		$('.emojionearea-editor').focus();
	});
}

function spinLoaded() {
	$('.main-loader').css('display', 'none');
}

function spinLoading() {
	$('.main-loader').css('display', 'flex');
}

function ajaxLoading() {
	$(document)
		.ajaxStart(function () {
			spinLoading();
		})
		.ajaxStop(function () {
			spinLoaded();
		});
}

function showModalContacts() {
	$('#show-modal-contacts').click(function () {
		$(this).find('.noti_contact_counter').fadeOut('slow');
	});
}

function configNotification() {
	$('#noti_Button').click(function () {
		$('#notifications').fadeToggle('fast', 'linear');
		$('.noti_counter').fadeOut('slow');
		return false;
	});
	$('.main-content').click(function () {
		$('#notifications').fadeOut('fast', 'linear');
	});
}

function gridPhotos(layoutNumber) {
	$('.show-images').unbind('click').on('click', function () {
		let href = $(this).attr('href');
		let modalImageId = href.replace('#', '')

		let originDataImage = $(`#${modalImageId}`).find('div.modal-body').html();
		let countRows = Math.ceil($(`#${modalImageId}`).find('div.all-images>img').length / layoutNumber);
		let layoutStr = new Array(countRows).fill(layoutNumber).join("");

		$(`#${modalImageId}`).find('div.all-images').photosetGrid({
			highresLinks: true,
			rel: 'withhearts-gallery',
			gutter: '2px',
			layout: layoutStr,
			onComplete: function () {
				$(`#${modalImageId}`).find('.all-images').css({
					'visibility': 'visible'
				});
				$(`#${modalImageId}`).find('.all-images a').colorbox({
					photo: true,
					scalePhotos: true,
					maxHeight: '90%',
					maxWidth: '90%'
				});
			},

		});
		// bat su kien dong modal
		$(`#${modalImageId}`).on('hidden.bs.modal',function () {
			$(this).find('div.modal-body').html(originDataImage)
		})
	})

}



function addFriendsToGroup() {
	$('ul#group-chat-friends').find('div.add-user').bind('click', function () {
		let uid = $(this).data('uid');
		$(this).remove();
		let html = $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').html();

		let promise = new Promise(function (resolve, reject) {
			$('ul#friends-added').append(html);
			$('#groupChatModal .list-user-added').show();
			resolve(true);
		});
		promise.then(function (success) {
			$('ul#group-chat-friends').find('div[data-uid=' + uid + ']').remove();
		});
	});
}

function cancelCreateGroup() {
	$('#cancel-group-chat').bind('click', function () {
		$('#groupChatModal .list-user-added').hide();
		if ($('ul#friends-added>li').length) {
			$('ul#friends-added>li').each(function (index) {
				$(this).remove();
			});
		}
	});
}

function flashMasterNotify() {
	let notify = $(".master-success-message").text();
	if (notify) {
		alertify.notify(notify, 'success', 5);
	}
}

function changeTypeChat() {
	$('#select-type-chat').bind('change', function () {
		let optionSelected = $("option:selected", this)
		optionSelected.tab('show');

		if ($(this).val() === 'user-chat') {
			$('.create-group-chat').hide()
		} else {
			$('.create-group-chat').show()
		}
	})
}

function changeSreenChat() {
	$('.room-chat').unbind('click').on('click', function () {
		let divId = $(this).find('li').data('chat');

		$('.person').removeClass('active')
		$(`.person[data-chat=${divId}]`).addClass('active')
		$(this).tab('show');

		// cau hinh thanh cuộn bên bõx chat mỗi khi click vào một cuộc trò chuyện cụ thể

		nineScrollRight(divId);

		// Bật emoji, tham số truyền vào là id của box nhập nội dung tin nhắn
		enableEmojioneArea(divId);
		//bật lắng nghe cho việc chat tin nhắn hình ảnh
		imageChat(divId)
		//tệp tin đính kèm
		attachmentChat(divId)
	})


}
function convertEmoji() {
  $(".convert-emoji").each(function () {
		var original = $(this).html();
		var converted = emojione.toImage(original);
		$(this).html(converted);
	});
}
function bufferToBase64(buffer) {
	return btoa(
		new Uint8Array(buffer)
		.reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
}

$(document).ready(function () {

	// Hide số thông báo trên đầu icon mở modal contact
	showModalContacts();

	// Bật tắt popup notification
	configNotification();

	// Cấu hình thanh cuộn
	nineScrollLeft();



	// Icon loading khi chạy ajax
	ajaxLoading();

	// Hiển thị button mở modal tạo nhóm trò chuyện
	//showButtonGroupChat();

	// Hiển thị hình ảnh grid slide trong modal tất cả ảnh, tham số truyền vào là số ảnh được hiển thị trên 1 hàng.
	// Tham số chỉ được phép trong khoảng từ 1 đến 5
	gridPhotos(5);

	// Thêm người dùng vào danh sách liệt kê trước khi tạo nhóm trò chuyện
	addFriendsToGroup();

	// Action hủy việc tạo nhóm trò chuyện
	cancelCreateGroup();

	// Flash message o man hinh master
	flashMasterNotify()

	//thay dổi kiểu trò chuyện
	changeTypeChat()
	// thay doi man hinh chat
  changeSreenChat()
  
  //chuyển unicode thành hình ảnh
  convertEmoji()
	// active vao phan tu dau tien khi load trang web
	$('ul.people').find('a')[0].click()


});
