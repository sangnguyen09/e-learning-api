$(document).ready(function () {
    $('#load_more_contacts_sent').bind('click', function () {
        let skipNumber = $('#request-contact-sent').find('li').length;
        $('#load_more_contacts_sent').parent().css('display', 'none')
        $('.lds-ripple').css('display', 'inline-block')

        $.get(`/contact/read-more-contacts-sent?skipNumber=${skipNumber}`, function (newContactUsers) {
            setTimeout(() => {
                if (!newContactUsers.length) {
                    alertify.notify("Bạn không còn danh sách nào để xem!", 'error', 7)
                    $('#load_more_contacts_sent').parent().css('display', 'block')
                    $('.lds-ripple').css('display', 'none')
                    return
                }
                newContactUsers.map(function (user) {
                    $("#request-contact-sent")
                        .find('ul')
                            .append(` 
                                <li class="_contactList" data-uid="${user._id}">
                                <div class="contactPanel">
                                    <div class="user-avatar">
                                        <img src="images/users/${user.avatar}" alt="">
                                    </div>
                                    <div class="user-name">
                                        <p>
                                        ${user.username}
                                        </p>
                                    </div>
                                    <br>
                                    <div class="user-address">
                                        <span>&nbsp ${user.address ? user.address : ''}</span>
                                    </div>
                                    <div class="user-remove-request-sent action-danger" data-uid="${user._id}">
                                    Hủy yêu cầu
                                </div>
                                </div>
                            </li`); // modal
                })
                $('#load_more_contacts_sent').parent().css('display', 'block')
                $('.lds-ripple').css('display', 'none')
            }, 300);

        })
    })
})