export const app ={
    image_chat_directory :'src/public/images/chat/message',
    image_chat_type:['image/png','image/jpg','image/jpeg',],
    image_chat_limit_size:1048576,// byte= 1M,
    
   attachment_chat_directory :'src/public/images/chat/message',
    attachment_chat_limit_size:1048576,// byte= 1M,
    
    avatar_directory :'src/public/images/users',
    avatar_type:['image/png','image/jpg','image/jpeg',],
	avatar_limit_size:1048576,// byte= 1M,
    general_avatar_group_chat :'group-avatar-trungquandev.png',
    max_event_listener:30, // so luong lang nghe su kien socket

    imageCourse_directory :'src/public/images/courses',
    imageCourse_type:['png','jpg','jpeg',],
    imageCourse_limit_size:1097152,  //2M
    
    nameApp: "E-learning",// tên của app xuất hiện trong gmail
    linkRedirectVerifyAccount: "http://localhost:3000/verify-account", // link kích hoạt tài khoản
    linkRedirectForgotPassword: "http://localhost:3000/reset-password",// link kich yeu câu mât khẩu mới
    minuteRequestForgotPassword:15 // số phút tối đa mà token request tồn tại



}
