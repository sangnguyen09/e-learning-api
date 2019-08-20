
function removeRequestContact() {
    $('.user-remove-request-contact').bind('click', function () {
        let targetId = $(this).data('uid'); //data-uid="<%= user._id %>"
        $.ajax({
            url: '/contact/remove-request-contact',
            type: 'delete',
            data: {
                uid: targetId
            },
            success: function (data) {
                if (data.success) {
                    $('#find-user').find(`div.user-remove-request-contact.action-danger[data-uid = ${targetId}]`).hide();
                    $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).css('display', 'inline-block');
                    decreaseNumberNotifyContact('count-request-contact-sent')
                    // Xu ly reatime
                    socket.emit('remove_request_contact',{contactId:targetId})
                }
            }
        })

    })
}

socket.on("response_remove_request_contact", function(user){
   
    $(".noti_content").find(`div[data-uid =${user.id}]`).remove();// xoa o popup
    $("ul.list-notifications").find(`li>div[data-uid =${user.id}]`).parent().remove(); // xoa o modal

    // xóa ở modal tab yêu cầu kết bạn

    decreaseNumberNotifyContact('count-request-contact-received')

    decreaseNumberNotification('noti_contact_counter',1)
    decreaseNumberNotification('noti_counter',1)
})