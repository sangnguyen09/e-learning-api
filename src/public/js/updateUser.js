 let userAvatar = null;
 let userInfo = {};
 let originAvatarSrc = null

function updateUserInfo() {
    $("#input-change-avatar").bind('change', function(){
        let fileData = $(this).prop('files')[0];
        let math =['image/png','image/jpg','image/jpeg',];
        let limit = 10485766;// byte= 1M
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
        if (typeof (FileReader )!=="undefined") {
            let imagePreview =$('#image-edit-profile');
            imagePreview.empty();
            let fileReader = new FileReader();
            fileReader.onload = function (element) {
                $('<img>',{
                    'src': element.target.result,
                    'class':'avatar img-circle',
                    'alt':'avatar',
                    'id':'user-modal-avatar'
                }).appendTo(imagePreview);
            }
            imagePreview.show();
            fileReader.readAsDataURL(fileData);

            let formData = new FormData();
            formData.append('avatar', fileData);
            userAvatar = formData
        }else{
            alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader", "error",7)
        }
    })
    $('#input-change-username').bind('change', function(){
        userInfo.username = $(this).val()
    })
    $('#input-change-gender-male').bind('click', function(){
        userInfo.gender = $(this).val()
    })

    $('#input-change-gender-female').bind('click', function(){
        userInfo.gender = $(this).val()
    })
    $('#input-change-phone').bind('change', function(){
        userInfo.phone = $(this).val()
    })
    $('#input-change-address').bind('change', function(){
        userInfo.address = $(this).val()
    })
}
$(document).ready(function(){
    updateUserInfo();
    originAvatarSrc =$('#user-modal-avatar').attr('src');

    $('#input-btn-update-user').bind('click', function () {
        if ($.isEmptyObject(userInfo) && !userAvatar) {
            alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu", "error",7)
            return 
        }
        // goij toi api bang ajax
        $.ajax({
            url: '/user/update-avatar',
            type:'put',
            cache: false,
            contentTypt: false,
            processData:false,
            data:userAvatar,
            success: function (result) {
                
            },
            error: function (err) {
                
            }
        })
        // console.log(userAvatar);
        // console.log(userInfo);
        
    })
    $('#input-btn-cancle-update-user').bind('click', function () {
        userAvatar =null
        userInfo = {}
        $('#user-modal-avatar').attr('src', originAvatarSrc)
    })
})