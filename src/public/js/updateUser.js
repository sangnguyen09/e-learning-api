 let userAvatar = null;
 let userInfo = {};
 let originAvatarSrc = null

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
             console.log(userAvatar.get('avatar'));

         } else {
             alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader", "error", 7)
         }
     })
     $('#input-change-username').bind('change', function () {
         userInfo.username = $(this).val()
     })
     $('#input-change-gender-male').bind('click', function () {
         userInfo.gender = $(this).val()
     })

     $('#input-change-gender-female').bind('click', function () {
         userInfo.gender = $(this).val()
     })
     $('#input-change-phone').bind('change', function () {
         userInfo.phone = $(this).val()
     })
     $('#input-change-address').bind('change', function () {
         userInfo.address = $(this).val()
     })
 }

 $(document).ready(function () {
     updateUserInfo();
     originAvatarSrc = $('#user-modal-avatar').attr('src');

    
     $('#input-btn-update-user').bind('click', function () {
         if ($.isEmptyObject(userInfo) && !userAvatar) {
             alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu", "error", 7)
             return
         }
         // goij toi api bang ajax
         $.ajax({
             url: '/user/update-avatar',
             type: 'put',
             cache: false,
             contentType: false,
             processData: false,
             data: userAvatar,
             success: function (result) {
                 console.log(result);
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
                 console.log(err)
                 // Display errors
                 $('.user-modal-alert-error').find('span').text(err.responseText)
                 $('.user-modal-alert-error').css('display', "block")

                  //reset all
                 $('#input-btn-cancle-update-user').click()
             }
         })
         // console.log(userAvatar); 
         // console.log(userInfo);

     })
   
     $('#input-btn-cancle-update-user').bind('click', function () {
         userAvatar = null
         userInfo = {}
         $("#input-change-avatar").val(null)
         $('#user-modal-avatar').attr('src', originAvatarSrc)
     })
 })