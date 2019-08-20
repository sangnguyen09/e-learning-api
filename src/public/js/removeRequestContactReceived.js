
function removeRequestContactReceived() {
    $('.user-remove-request-contact-received').unbind('click').on('click', function () {
        console.log('object')
        let targetId = $(this).data('uid'); //data-uid="<%= user._id %>"
        $.ajax({
            url: '/contact/remove-request-contact-received',
            type: 'delete',
            data: {
                uid: targetId
            },
            success: function (data) {
                if (data.success) {
                    //  chức năng xóa thông bao, neu ng dung hủy yeu cau thi ko xóa thông báo
                   // $(".noti_content").find(`div[data-uid =${user.id}]`).remove();// xoa o popup
                   // $("ul.list-notifications").find(`li>div[data-uid =${user.id}]`).parent().remove(); // xoa o modal
                    //decreaseNumberNotification('noti_counter',1)

                    decreaseNumberNotifyContact('count-request-contact-received')

                    decreaseNumberNotification('noti_contact_counter',1)//js/caculateNotification.js

                    // xóa ở modal tab yêu cầu kết bạn khi dc gui yeu cau tu ng dung khac
                $('#request-contact-received').find(`li[data-uid=${targetId}]`).remove()
                    // Xu ly reatime
                    socket.emit('remove_request_contact-received',{contactId:targetId})
                }
            }
        })

    })
}

socket.on("response_remove_request_contact_received", function(user){
    $('#find-user').find(`div.user-remove-request-contact-sent.action-danger[data-uid = ${user.id}]`).hide();
    $('#find-user').find(`div.user-add-new-contact[data-uid = ${user.id}]`).css('display', 'inline-block');
   
     // xóa ở modal tab ddang cho xac nhan
     $('#request-contact-sent').find(`li[data-uid=${user.id}]`).remove()

    decreaseNumberNotifyContact('count-request-contact-sent')

    decreaseNumberNotification('noti_contact_counter',1)
})

$(document).ready(function () {
    removeRequestContactReceived()
})