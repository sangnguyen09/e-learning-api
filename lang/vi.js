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
}
export const transSuccess = {
    userCreated: (userEmail) =>{
        return ` Tài khoản <strong>${userEmail} </strong> đã được tạo, vui lòng kiểm tra email để active tài khoản.`
    }
}
