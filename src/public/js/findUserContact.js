function callFindUsers(element) {
    if (element.which === 13 || element.type === 'click') { // 13 la phim ENTER
        let keyword = $('#input_find_users_contact').val();
        let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)

        if (!keyword.length) {
            alertify.notify("Chưa nhập nội dung tìm kiếm ", "error", 7)
            return

        }
        if (!regexKeyword.test(keyword)) {
            alertify.notify("Chỉ cho phép kí tự chữ cái và số, khoảng trắng ", "error", 7)
            return
        }
        $.get(`/contact/find-users/${keyword}`, function (data) {
            $('#find-user ul').html(data)
            addContact() //js/addContact.js
            removeRequestContact() //js/removeRequestContact.js
        })
    }
}

$(document).ready(function () {
    $('#input_find_users_contact').bind("keypress", callFindUsers)

    $('#btn_find_users_contact').bind("click", callFindUsers)

})