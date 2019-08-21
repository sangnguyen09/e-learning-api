function removeContact() {
	$(".user-remove-contact")
		.unbind("click")
		.on("click", function () {
			let targetId = $(this).data("uid"); //data-uid="<%= user._id %>"
			let username = $(this).parent().find('div.user-name p').text();

			Swal.fire({
				title: `Bạn có chắc chắn muốn xoá ${username} khỏi danh bạ`,
				text: "Bạn không thể hoàn tác lại quá trình này!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#2ECC71',
				cancelButtonColor: '#ff7675',
				confirmButtonText: 'Xác nhận',
				cancelButtonText: 'Hủy bỏ',
			}).then((result) => {
				if (!result.value) {

					return
				}
				$.ajax({
					url: "/contact/remove-contact",
					type: "delete",
					data: {
						uid: targetId
					},
					success: function (data) {
						if (data.success) {
							$("#contacts")
								.find(`ul li[data-uid=${targetId}]`)
								.remove();
							decreaseNumberNotifyContact("count-contacts"); // js/caculateNotifContact.js

							// sau nay lam chuc nang cht thi se xoa tieep user o phan chat
							socket.emit("remove_contact", {
								contactId: targetId
							});
						}
					}
				});
			})

		});
}

socket.on("response_remove_contact", function (user) {
	$("#contacts")
		.find(`ul li[data-uid=${user.id}]`)
		.remove();
	decreaseNumberNotifyContact("count-contacts"); // js/caculateNotifContact.js
});

$(document).ready(function () {
	removeContact();
});
