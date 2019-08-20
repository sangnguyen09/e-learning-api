$(document).ready(function () {
    $('#load_more_contacts_received').bind('click', function () {
        let skipNumber = $('#request-contact-received').find('li').length;
        $('#load_more_contacts_received').parent().css('display', 'none')
        $('.lds-ripple').css('display', 'inline-block')

        $.get(`/contact/read-more-contacts-received?skipNumber=${skipNumber}`, function (newContactUsers) {
            setTimeout(() => {
                if (!newContactUsers.length) {
                    alertify.notify("Bạn không còn yêu cầu kết bạn nào để xem!", 'error', 7)
                    $('#load_more_contacts_received').parent().css('display', 'block')
                    $('.lds-ripple').css('display', 'none')
                    return
                }
                newContactUsers.map(function (user) {
                    $("#request-contact-received")
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
                                    <div class="user-acccept-contact-received" data-uid="${user._id}">
                                    Chấp nhận
                                </div>
                                <div class="user-reject-request-contact-received action-danger"
                                    data-uid="${user._id}">
                                    Xóa yêu cầu
                                </div>
                                </div>
                            </li`); // modal
                })
                $('#load_more_contacts_received').parent().css('display', 'block')
                $('.lds-ripple').css('display', 'none')
            }, 300);

        })
    })
})