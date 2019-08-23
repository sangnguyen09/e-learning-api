function imageChat(divId) {
    $(`#image-chat-${divId}`).unbind('change').on('change', function () {
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
        let targetId =$(this).data('chat');
        let messageFormData = new FormData();
        messageFormData.append('my-image-chat', fileData);
        messageFormData.append('uid', targetId);

        if ($(this).hasClass('chat-in-group')) {
            messageFormData.append('isChatGroup', true)
        }
      
        $.ajax({
            url: '/message/add-new-image',
            type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: messageFormData,
            success: function (data) {
                      console.log(data);
            },
            error: function (err) {
                alertify.notify(err.responseText, 'error', 7)
            }
        })
    })
}