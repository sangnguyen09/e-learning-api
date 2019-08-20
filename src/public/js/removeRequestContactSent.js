
function removeRequestContactSent() {
    $('.user-remove-request-contact-sent').unbind('click').on('click', function () {
        let targetId = $(this).data('uid'); //data-uid="<%= user._id %>"
        $.ajax({
            url: '/contact/remove-request-contact-sent',
            type: 'delete',
            data: {
                uid: targetId
            },
            success: function (data) {
                if (data.success) {
                    $('#find-user').find(`div.user-remove-request-contact-sent.action-danger[data-uid = ${targetId}]`).hide();
                    $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).css('display', 'inline-block');

                    decreaseNumberNotifyContact('count-request-contact-sent')

                    // xóa ở modal tab ddang cho xac nhan
                    $('#request-contact-sent').find(`li[data-uid=${targetId}]`).remove()
                    // Xu ly reatime
                    socket.emit('remove_request_contact-sent',{contactId:targetId})
                }
            }
        })

    })
}

socket.on("response_remove_request_contact_sent", function(user){
   
    $(".noti_content").find(`div[data-uid =${user.id}]`).remove();// xoa o popup
    $("ul.list-notifications").find(`li>div[data-uid =${user.id}]`).parent().remove(); // xoa o modal

    // xóa ở modal tab yêu cầu kết bạn khi dc gui yeu cau tu ng dung khac
    $('#request-contact-received').find(`li[data-uid=${user.id}]`).remove()

    decreaseNumberNotifyContact('count-request-contact-received')

    decreaseNumberNotification('noti_contact_counter',1)
    decreaseNumberNotification('noti_counter',1)
})

$(document).ready(function () {
    removeRequestContactSent()
})