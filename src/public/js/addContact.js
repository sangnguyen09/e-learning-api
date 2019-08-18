
function addContact() {
    $('.user-add-new-contact').bind('click', function () {
        let targetId = $(this).data('uid');//data-uid="<%= user._id %>"
        $.post('/contact/add-new', {uid: targetId}, function (data) {
             if (data.success) {
                 $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).hide();
                 $('#find-user').find(`div.user-remove-request-contact.action-danger[data-uid = ${targetId}]`).css('display','inline-block');

                 increaseNumberNotifyContact('count-request-contact-sent')
                 // Xu ly reatime
             }
            
        })
    })
}
