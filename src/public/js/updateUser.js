 let userAvatar = null;
 let userInfo = {};
 let originAvatarSrc = null
 let originUserInfo ={};
 let userUpdatePassword ={}


function callLogOut() {
    let timeInterval;
    Swal.fire({
        position: 'top-end',
        title: 'Tự động đăng xuất sau 5 giây',
        html:"Thời gian: <strong></strong>",
        timer: 5000,
        onBeforeOpen: () =>{
            Swal.showLoading();
            timeInterval = setInterval(() => {
                Swal.getContent().querySelector('strong').textContent = Math.ceil(Swal.getTimerLeft()/1000)
            }, 1000);
        },
        onClose:() =>{
            clearInterval(timeInterval)
        }

      }).then((result) => {
          $.get('/logout', function () {
              location.reload();
          })
      })
}

 function updateUserInfo() {
     $("#input-change-avatar").bind('change', function () {
         let fileData = $(this).prop('files')[0];
         let math = ['image/png', 'image/jpg', 'image/jpeg', ];
         let limit = 1048576; // byte= 1M
         if ($.inArray(fileData.type, math )===-1) {
             alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg & png", "error",7)
             $(this).val(null);
             return 
         }
         if (fileData.size > limit) {
             alertify.notify("Ảnh upalod tối đa cho phép là 1MB", "error",7)
             $(this).val(null);
             return 
         }
         if (typeof (FileReader) !== "undefined") {
             let imagePreview = $('#image-edit-profile');
             imagePreview.empty();
             let fileReader = new FileReader();
             fileReader.onload = function (element) {
                 $('<img>', {
                     'src': element.target.result,
                     'class': 'avatar img-circle',
                     'alt': 'avatar',
                     'id': 'user-modal-avatar'
                 }).appendTo(imagePreview);
             }
             imagePreview.show();
             fileReader.readAsDataURL(fileData);

             let formData = new FormData();
             formData.append('avatar', fileData);
             userAvatar = formData

         } else {
             alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader", "error", 7)
         }
     })
     $('#input-change-username').bind('change', function () {
         let username =$(this).val();
         let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
            if (!regexUsername.test(username ) || username.length <3 || username.length >17) {
                alertify.notify("Username giới hạn trong khoảng 3-17 kí tự và không được chứa kí tự đặc biệt.", "error",7)
                $(this).val(originUserInfo.username);
                delete userInfo.username
                return
            }
         
         userInfo.username = username
     })
     $('#input-change-gender-male').bind('click', function () {
        let gender =$(this).val();
        if (gender !== 'male') {
            alertify.notify("Oops! Dữ liệu giới tính có vấn đề , bạn là hacker chăng?", "error",7)
            $(this).val(originUserInfo.gender);
            delete userInfo.gender
            return
        }
       
         userInfo.gender = gender
     })

     $('#input-change-gender-female').bind('click', function () {
        let gender =$(this).val();
        if (gender !== 'female') {
            alertify.notify("Oops! Dữ liệu giới tính có vấn đề , bạn là hacker chăng?", "error",7)
            $(this).val(originUserInfo.gender);
            delete userInfo.gender
            return
        }
       
         userInfo.gender = gender
     })
     $('#input-change-phone').bind('change', function () {
        let phone = $(this).val();
        let regexPhone= /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
        if (!regexPhone.test(phone)) {
            alertify.notify("Số điện thoại Việt Nam bao gồm 10 kí tự số.", "error",7)
            $(this).val(originUserInfo.phone);
            delete userInfo.phone
            return
        }
         userInfo.phone = phone
     })
     $('#input-change-address').bind('change', function () {
        let address =$(this).val();

        if (address.length <3 || address.length >30) {
            alertify.notify("Địa chỉ giới hạn trong khoảng 3-30 kí tự", "error",7)
            $(this).val(originUserInfo.address);
            delete userInfo.address
            return
        }
         userInfo.address = address
     })
     $('#input-change-current-password').bind('change', function () {
        let currentPassword =$(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
        if (!regexPassword.test(currentPassword)) {
            alertify.notify("Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt", "error",7)
            $(this).val(null);
            delete userUpdatePassword.currentPassword
            return
        }
         userUpdatePassword.currentPassword = currentPassword
     })
     $('#input-change-new-password').bind('change', function () {
        let newPassword =$(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
        if (!regexPassword.test(newPassword)) {
            alertify.notify("Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt", "error",7)
            $(this).val(null);
            delete userUpdatePassword.newPassword
            return
        }
         userUpdatePassword.newPassword = newPassword
     })
     $('#input-change-confirm-new-password').bind('change', function () {
        let confirmNewPassword =$(this).val();
        if (!userUpdatePassword.newPassword) {
            alertify.notify("Bạn chưa nhập mật khẩu mới", "error",7)
            $(this).val(null);
            delete userUpdatePassword.confirmNewPassword
            return
        }
        if (userUpdatePassword.newPassword !== userUpdatePassword.newPassword) {
            alertify.notify("Nhập lại mật khẩu chưa chính xác", "error",7)
            $(this).val(null);
            delete userUpdatePassword.confirmNewPassword
            return
        }
         userUpdatePassword.confirmNewPassword = confirmNewPassword
     })
     
 }
function callUpdateUserAvatar() {
    $.ajax({
        url: '/user/update-avatar',
        type: 'put',
        cache: false,
        contentType: false,
        processData: false,
        data: userAvatar,
        success: function (result) {
                  // Display success
                  $('.user-modal-alert-success').find('span').text(result.message)
                  $('.user-modal-alert-success').css('display', "block")

                  // update avatar tai thanh n
                  $('#navbar-avatar').attr('src',result.imageSrc)

                  // update origin avatar src
                  originAvatarSrc =result.imageSrc
                  //reset all
                  $('#input-btn-cancle-update-user').click()
        },
        error: function (err) {
            // Display errors
            $('.user-modal-alert-error').find('span').text(err.responseText)
            $('.user-modal-alert-error').css('display', "block")

             //reset all
            $('#input-btn-cancle-update-user').click()
        }
    })
}
function callUpdateUserInfo() {
    $.ajax({
        url: '/user/update-info',
        type: 'put',
        data: userInfo,
        success: function (result) {
                  // Display success
                  $('.user-modal-alert-success').find('span').text(result.message)
                  $('.user-modal-alert-success').css('display', "block")

                  originUserInfo =Object.assign(originUserInfo, userInfo)
                  // update user name navbar
                  $('#navbar_username').text(originUserInfo.username)

                  //reset all
                  $('#input-btn-cancle-update-user').click()
        },
        error: function (err) {
            // Display errors
            $('.user-modal-alert-error').find('span').text(err.responseText)
            $('.user-modal-alert-error').css('display', "block")

             //reset all
            $('#input-btn-cancle-update-user').click()
        }
    })
}
// update mat khau
function callUpdateUserPassword() {
    $.ajax({
        url: '/user/update-password',
        type: 'put',
        data: userUpdatePassword,
        success: function (result) {
                  // Display success
                  $('.user-modal-password-alert-success').find('span').text(result.message)
                  $('.user-modal-password-alert-success').css('display', "block")

               
                  //reset all
                  $('#input-btn-cancel-user-password').click()
                  // đăng xuất sau khi thay mật khẩu thành công
                  callLogOut()
        },
        error: function (err) {
            // Display errors
            $('.user-modal-password-alert-error').find('span').text(err.responseText)
            $('.user-modal-password-alert-error').css('display', "block")

             //reset all
            $('#input-btn-cancel-user-password').click()
        }
    })
}

 $(document).ready(function () {
     originUserInfo ={
         username:$('#input-change-username').val(),
         gender: ($('#input-change-gender-male').is(":checked") )?  $('#input-change-gender-male').val() : $('#input-change-gender-female').val(),
         address:$('#input-change-address').val(),
         phone:$('#input-change-phone').val(),
     }
     originAvatarSrc = $('#user-modal-avatar').attr('src');

     // update user info sau khi thay đổi các giá tr
     updateUserInfo();
    
     $('#input-btn-update-user').bind('click', function () {
         if ($.isEmptyObject(userInfo) && !userAvatar) {
             alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu", "error", 7)
             return
         }
         // goij toi api bang ajax
        userAvatar && callUpdateUserAvatar()
        
        !$.isEmptyObject(userInfo) && callUpdateUserInfo()

     })
   
     $('#input-btn-cancel-update-user').bind('click', function () {
         userAvatar = null
         userInfo = {}
         $("#input-change-avatar").val(null)
         $('#user-modal-avatar').attr('src', originAvatarSrc)

         $('#input-change-username').val(originUserInfo.username);
         (originUserInfo.gender === "male") ?  $('#input-change-gender-male').click() :  $('#input-change-gender-female').click();
         $('#input-change-address').val(originUserInfo.address)
         $('#input-change-phone').val(originUserInfo.phone)
     })
     $('#input-btn-update-user-password').bind('click', function () {
        if (!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword ) {
            alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật mật khẩu", "error", 7)
            return
        }
        Swal.fire({
            title: 'Bạn có chắc chắn muốn thay đổi mật khẩu',
            text: "Bạn không thể hoàn tác lại quá trình này!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#2ECC71',
            cancelButtonColor: '#ff7675',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy bỏ',
          }).then((result) => {
           if (!result.value) {
            $('#input-btn-cancel-user-password').click()
            return
           }
           callUpdateUserPassword()
          })
       // 
    })
     $('#input-btn-cancel-user-password').bind('click', function () {
        userUpdatePassword = {}
        $('#input-change-current-password').val(null)
        $('#input-change-new-password').val(null)
        $('#input-change-confirm-new-password').val(null)
        
    })
 })