$(document).ready(function () {
    $('#load_more_contacts').bind('click', function () {
        let skipNumber = $('#contacts').find('li').length;
        $('#load_more_contacts').parent().css('display', 'none')
        $('.lds-ripple').css('display', 'inline-block')

        $.get(`/contact/read-more-contacts?skipNumber=${skipNumber}`, function (newContactUsers) {
            setTimeout(() => {
                if (!newContactUsers.length) {
                    alertify.notify("Bạn không còn bạn bè nào để xem!", 'error', 7)
                    $('#load_more_contacts').parent().css('display', 'block')
                    $('.lds-ripple').css('display', 'none')
                    return
                }
                newContactUsers.map(function (user) {
                    $("#contacts")
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
                                    <div class="user-talk" data-uid="${user._id}">
                                        Trò chuyện
                                    </div>
                                    <div class="user-remove-contact action-danger" data-uid="${user._id}">
                                        Xóa liên hệ
                                    </div>
                                </div>
                            </li`); // modal
                })
                $('#load_more_contacts').parent().css('display', 'block')
				$('.lds-ripple').css('display', 'none')

				removeContact();//js/removeContact.jss
            }, 300);

        })
    })
})
