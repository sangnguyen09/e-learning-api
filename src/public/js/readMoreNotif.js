$(document).ready(function () {
    $('#load_more_notify').bind('click', function () {
        let skipNumber = $('ul.list-notifications').find('li').length;
        $(this).parent().css('display', 'none')
        $('.lds-ripple').css('display', 'inline-block')

        $.get(`/notification/read-more?skipNumber=${skipNumber}`, function (notifications) {
            setTimeout(() => {
                if (!notifications.length) {
                    alertify.notify("Bạn không còn thông báo nào để xem!", 'error', 7)
                    return
                }
                notifications.map(function (notification) {
                    $("ul.list-notifications").append(`<li>${notification} </li>`); // modal
                })
                $('#load_more_notify').parent().css('display', 'block')
                $('.lds-ripple').css('display', 'none')
            }, 300);

        })
    })
})