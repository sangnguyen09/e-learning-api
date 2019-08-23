export const transValidation ={
    email_incorrect : "Email phải có dạng exemple@gmail.com",
    gender_incorrect : "Tại sao trường giới tính lại bị sai",
    password_incorrect : "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt",
    password_confirmation_incorrect : "Nhập lại mật khẩu chưa chính xác",
    update_username:'Username giới hạn trong khoảng 3-17 kí tự và không được chứa kí tự đặc biệt.',
    update_gender:'Oops! Dữ liệu giới tính có vấn đề , bạn là hacker chăng?',
    update_address:'Địa chỉ giới hạn trong khoảng 3-30 kí tự',
    update_phone:'Số điện thoại Việt Nam 10 kí tự số.',
	keyword_find_user: 'Chỉ cho phép kí tự chữ cái và số, khoảng trắng ',
	message_text_emoji_incorrect:'Tin nhắn không hợp lệ. Đảm bảo 1 kí tự, tối đa 400 kí tự.'
}
export const transErrors ={
    account_in_use :"Email này đã được sử dụng",
    account_remove:"Tài khoản này đã bị gỡ khỏi hệ thống",
    account_not_active :"Email này đã đăng ký nhưng chưa được active, vui lòng kiểm tra email",
    account_undifined :"Tài khoản không tồn t",
    token_undifined: 'Token không tồn tại !',
    login_failed: "Sai tài khoản hoặc mật khẩu !",
    server_error: "Có lỗi ở phía server, vui lòng thông báo bộ phận của chúng tôi về lỗi này!",
    avatar_type: 'Kiểu file không hợp lệ, chỉ chấp nhận jpg & png',
    image_chat_type: 'Kiểu file không hợp lệ, chỉ chấp nhận jpg & png',
    image_chat_size: 'Ảnh upalod tối đa cho phép là 1MB',
    attachment_chat_size: 'File upalod tối đa cho phép là 1MB',
    avatar_size: 'Ảnh upalod tối đa cho phép là 1MB',
	user_current_password_failed: "Mật khẩu hiện tại không chính xác",
	conversation_not_found:'Cuộc trò chuyện không tồn tại!'
}
export const transSuccess = {
    userCreated: (userEmail) =>{
        return ` Tài khoản <strong>${userEmail} </strong> đã được tạo, vui lòng kiểm tra email để active tài khoản.`
    },
    account_actived: "Kích hoạt tài khoản thành công bạn có thể đăng nhập vào ứng dụng",
    loginSuccess : (username) =>{
        return `Xin chào ${username}, chúc một ngày tốt lành!`
    },
    logout_success: "Đăng xuất tài khoản thành công!",
    avatar_updated: " Cập nhật ảnh đại diện thành công",
    user_info_updated: " Cập nhật thông tin thành công",
    user_password_updated: " Cập nhật mật khẩu thành công",
}
export const transMail ={
    subject : "Awesome Chat: Xác nhận kích hoạt tài khoản",
    template :(linkVerify)=>{
        return `
            <h2> Bạn nhận được email này vì đã đăng kí tài khoản trên ứng dụng Awesome Chat. </h2>
            <h3> Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản. </h3>
            <h3> <a href="${linkVerify}" target="blank" > ${linkVerify}</a> </h3>
            <h4> Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua. Trân trọng </h4>
        `
    },
    send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ lại bộ phận hỗ trợ "
}
