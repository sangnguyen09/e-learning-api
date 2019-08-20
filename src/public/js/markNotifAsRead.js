function markNotificationAsRead(targetUsers) {
    $.ajax({
        url: '/notification/mark-all-as-read',
        type: 'put',
        data: {targetUsers},
        success: function (result) {
            if (result) {
                targetUsers.map(uid => {
                    $('.noti_content').find(`div[data-uid = ${uid}]`).removeClass('notif-readed-false');
                    $('ul.list-notifications').find(`li>div[data-uid=${uid}]`).removeClass('notif-readed-false');
                });
                decreaseNumberNotification("noti_counter",targetUsers.length)
            };
        }
    })
}

$(document).ready(function () {
    //đánh dấu tất cả đã đọc
    $('#popup-mark-notif-readed').bind('click', function () {
        let targetUsers = [];
        $('.noti_content').find('div.notif-readed-false').each((index, nofify) => {
            targetUsers = [...targetUsers, $(nofify).data('uid')]
        })
        if (!targetUsers.length) {
            alertify.notify('Bạn không còn thông báo nào chưa đọc!', 'error', 7)
        }
        markNotificationAsRead(targetUsers)
    });


    $('#modal-mark-notif-readed').bind('click', function () {
        let targetUsers = [];
        $('ul.list-notifications').find('li>div.notif-readed-false').each((index, nofify) => {
            targetUsers = [...targetUsers, $(nofify).data('uid')]
        })
        if (!targetUsers.length) {
            alertify.notify('Bạn không còn thông báo nào chưa đọc!', 'error', 7)
        }
        markNotificationAsRead(targetUsers)
    })
})