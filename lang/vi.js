export const transValidation ={
    email_incorrect : "Email phải có dạng exemple@gmail.com",
    gender_incorrect : "Tại sao trường giới tính lại bị sai",
    password_incorrect : "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt",
    password_confirmation_incorrect : "Nhập lại mật khẩu chưa chính xác",
}
export const transErrors ={
    account_in_use :"Email này đã được sử dụng",
    account_remove:"Tài khoản này đã bị gỡ khỏi hệ thống",
    account_not_active :"Email này đã đăng ký nhưng chưa được active, vui lòng kiểm tra email",
    token_undifined: 'Token không tồn tại !'
}
export const transSuccess = {
    userCreated: (userEmail) =>{
        return ` Tài khoản <strong>${userEmail} </strong> đã được tạo, vui lòng kiểm tra email để active tài khoản.`
    },
    account_actived: "Kích hoạt tài khoản thành công bạn có thể đăng nhập vào ứng dụng"
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