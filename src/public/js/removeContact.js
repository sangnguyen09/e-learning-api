function removeContact() {
  $(".user-remove-contact")
    .unbind("click")
    .on("click", function() {
      let targetId = $(this).data("uid"); //data-uid="<%= user._id %>"
      let username = $(this)
        .parent()
        .find("div.user-name p")
        .text();

      Swal.fire({
        title: `Bạn có chắc chắn muốn xoá ${username} khỏi danh bạ`,
        text: "Bạn không thể hoàn tác lại quá trình này!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2ECC71",
        cancelButtonColor: "#ff7675",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ"
      }).then(result => {
        if (!result.value) {
          return;
        }
        $.ajax({
          url: "/contact/remove-contact",
          type: "delete",
          data: {
            uid: targetId
          },
          success: function(data) {
            if (data.success) {
              $("#contacts")
                .find(`ul li[data-uid=${targetId}]`)
                .remove();
              decreaseNumberNotifyContact("count-contacts"); // js/caculateNotifContact.js

              socket.emit("remove_contact", {
                contactId: targetId
              });

              ///   // all steps handle chat after remove contact
			  // step 0: check active
			  let checkActive = $('#all-caht').find(`li[data-chat=${targetId}]`).hasClass('active')
              // step 1:
              $("#all-chat").find(`ul a[href ="#uid_${targetId}"]`).remove();
              $("#user-chat").find(`ul a[href="#uid_${targetId}"]`).remove();
			  //step 2: remove rightSide
			  $("#screen-chat").find(`div#to_${targetId}`).remove();
			  // Buoc 3: remove imageModal

			  $('body').find(`div#imageModal_${targetId}`).remove()
			  // Buoc 4: remove attactmentModal

			  $('body').find(`div#attactmentModal_${targetId}`).remove()
			  // Buoc 5 : clich first conversation
			  if (checkActive) {
				  //
				  $('ul.people').find('a')[0].click()
			  }
            }
          }
        });
      });
    });
}

socket.on("response_remove_contact", function(user) {
  $("#contacts")
    .find(`ul li[data-uid=${user.id}]`)
    .remove();
  decreaseNumberNotifyContact("count-contacts"); // js/caculateNotifContact.js

  	  // step 0: check active
		let checkActive = $('#all-caht').find(`li[data-chat=${user.id}]`).hasClass('active')
    // step 1:
	$("#all-chat").find(`ul a[href="#uid_${user.id}"]`).remove();
	$("#user-chat").find(`ul a[href="#uid_${user.id}"]`).remove();
	//step 2: remove rightSide
	$("#screen-chat").find(`div#to_${user.id}`).remove();
	// Buoc 3: remove imageModal

	$('body').find(`div#imageModal_${user.id}`).remove()
	// Buoc 4: remove attactmentModal

	$('body').find(`div#attactmentModal_${user.id}`).remove()
	  // Buoc 5 : clich first conversation
	  if (checkActive) {
		//
		$('ul.people').find('a')[0].click()
	}
});

$(document).ready(function() {
  removeContact();
});
