
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
                    // Xu ly reatime
                    decreaseNumberNotifyContact('count-request-contact-sent')
                }
            }
        })

    })
}