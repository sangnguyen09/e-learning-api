export const transValidation = {
	email_incorrect: "Email phải có dạng exemple@gmail.com",
	fullname_incorrect: "Họ tên phải chứa từ 5 đến 30 ki tự",
	phone_incorrect: "Vui lòng nhập đúng số điện thoại.",
	gender_incorrect: "Vui lòng chọn đúng giới tính",
	password_incorrect: "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt",
	password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác",
	update_username: 'Username giới hạn trong khoảng 3-17 kí tự và không được chứa kí tự đặc biệt.',
	update_gender: 'Oops! Dữ liệu giới tính có vấn đề , bạn là hacker chăng?',
	update_address: 'Địa chỉ giới hạn trong khoảng 3-30 kí tự',
	update_phone: 'Số điện thoại Việt Nam 10 kí tự số.',
	keyword_find_user: 'Chỉ cho phép kí tự chữ cái và số, khoảng trắng ',
	message_text_emoji_incorrect: 'Tin nhắn không hợp lệ. Đảm bảo 1 kí tự, tối đa 400 kí tự.',
	chat_group_users: 'Vui lòng chọn thêm bạn bè tối thiểu 2 người!',
	chat_group_name: 'Vui lòng nhập tên nhóm từ 5 đến 30 kí tự',

	refresh_token_incorrect: "Token refresh không chính xác!",
	token_incorrect: "Token không chính xác!",

	course_title_incorrect: 'Vui lòng nhập đúng mục tiêu đề',
	course_description_incorrect: 'Vui lòng nhập đúng mục mô tả',
	course_video_demo_incorrect: 'Vui lòng nhập link Youtube',
	course_status_incorrect: 'Vui lòng chọn đúng mục trạng thái',
	course_price_incorrect: 'Vui lòng nhập đúng mục giá',
	course_discount_incorrect: 'Vui lòng nhập đúng mục giảm giá',
	course_author_incorrect: 'Vui lòng chọn đúng mục giảng viên',
	course_level_incorrect: 'Vui lòng chọn đúng mục trình độ',
	course_category_incorrect: 'Vui lòng chọn đúng danh mục',
	course_image_incorrect: 'Vui lòng upload hình ảnh khoá học',

}
export const transErrors = {
	account_in_use: "Email này đã được sử dụng",
	account_remove: "Tài khoản này đã bị gỡ khỏi hệ thống",
	account_not_active: "Email này đã đăng ký nhưng chưa được active, vui lòng kiểm tra email",
	account_find_not_found: "Tài khoản không tồn tại ",
	unauthorized: "Unauthorized",
	token_undifined: 'Token không tồn tại !',
	login_failed: "Sai tài khoản hoặc mật khẩu !",
	token_failed: "Token hết hạn hoặc không chính xác !",
	server_error: "Có lỗi ở phía server, vui lòng thông báo bộ phận của chúng tôi về lỗi này!",
	avatar_type: 'Kiểu file không hợp lệ, chỉ chấp nhận jpg & png',
	image_chat_type: 'Kiểu file không hợp lệ, chỉ chấp nhận jpg & png',
	image_chat_size: 'Ảnh upalod tối đa cho phép là 1MB',
	attachment_chat_size: 'File upalod tối đa cho phép là 1MB',
	avatar_size: 'Ảnh upalod tối đa cho phép là 1MB',
	user_current_password_failed: "Mật khẩu hiện tại không chính xác",
	conversation_not_found: 'Cuộc trò chuyện không tồn tại!',

	course_image_size: "Ảnh upalod tối đa cho phép là 2MB"
}
export const transSuccess = {
	userCreated: (userEmail) => {
		return ` Tài khoản ${userEmail} đã được tạo, vui lòng kiểm tra email để active tài khoản.`
	},
	account_actived: "Kích hoạt tài khoản thành công bạn có thể đăng nhập",
	loginSuccess: (username) => {
		return `Xin chào ${username}, chúc một ngày tốt lành!`
	},
	logout_success: "Đăng xuất tài khoản thành công!",
	avatar_updated: " Cập nhật ảnh đại diện thành công",
	user_info_updated: " Cập nhật thông tin thành công",
	user_password_updated: " Cập nhật mật khẩu thành công",
    user_request_forgot_password_success: "Yêu cầu của bạn đã được chấp nhận, vui lòng kiểm tra email để cập nhật lại mật khẩu mới!",
    
    removeCourseSuccess: (num) =>{
        return `Bạn vừa xoá ${num} khoá học.`
    }
}
export const transMail = {
	subject: "Email xác nhận kích hoạt tài khoản",
	template: (linkVerify, nameApp) => {
		return `  <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }

            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {

            .mj-column-per-100,
            * [aria-labelledby="mj-column-per-100"] {
                width: 100% !important;
            }

            .mj-column-per-80,
            * [aria-labelledby="mj-column-per-80"] {
                width: 80% !important;
            }

            .mj-column-per-30,
            * [aria-labelledby="mj-column-per-30"] {
                width: 30% !important;
            }

            /* .mj-column-per-70,
            * [aria-labelledby="mj-column-per-70"] {
                width: 70% !important;
            } */
        }
    </style>
    <div style="background-color:#E3E5E7;">
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:#222228;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#222228;"
                align="center" border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:480px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-80" class="mj-column-per-80"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%"
                                    border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:30px;"
                                                align="center">
                                                <table cellpadding="0" cellspacing="0"
                                                    style="border-collapse:collapse;border-spacing:0px;"
                                                    align="center" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width:80px;"><img alt="Zero To Launch"
                                                                    title="" height="auto"
                                                                    src="https://cdn.auth0.com/website/emails/product/top-verify.png"
                                                                    style="border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:auto;"
                                                                    width="80"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 20px 0px 20px;"
                                                align="center">
                                                <div
                                                    style="cursor:auto;color:white;font-family:'Avenir Next', Avenir, sans-serif;font-size:32px;line-height:60ps;">
                                                    Kích hoạt tài khoản
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 25px 0px;">
                          
                            <!--[if mso | IE]>
  </td><td style="vertical-align:top;width:180px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-70" class="mj-column-per-70"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;"
                                                align="left">
                                                <div
                                                    style="cursor:auto;color:#222228;font-family:'Avenir Next', Avenir, sans-serif;font-size:16px;line-height:30px;">
                                                    <p  style="color:#0a84ae; "> Cám ơn bạn đã đăng ký tài khoản tại ${nameApp}! </p>
                                                    <p>Vui lòng bấm vào nút bên dưới để tài khoản của bạn được kích hoạt và có thể đăng nhập vào ${nameApp}!</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
</td></tr></table>
<![endif]--> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px 30px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:600px;">
  <![endif]-->
                            <p style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;"></p>
                            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]-->
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:10px 25px;"
                                                align="center">
                                                <table cellpadding="0" cellspacing="0" align="center" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="border-radius:3px;color:white;cursor:auto;"
                                                                align="center" valign="middle" bgcolor="#EB5424">
                                                                <a
                                                                              href="${linkVerify}"
                                                                    style="display:inline-block;text-decoration:none;background:#EB5424;border-radius:3px;color:white;font-family:'Avenir Next', Avenir, sans-serif;font-size:14px;font-weight:500;line-height:35px;padding:10px 25px;margin:0px;"
                                                                    target="_blank">
                                                                    KÍCH HOẠT TÀI KHOẢN
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%"
                                    border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 25px 15px;"
                                                align="left">
                                                <div
                                                    style="cursor:auto;color:#222228;font-family:'Avenir Next', Avenir, sans-serif;font-size:16px;line-height:30px;">
                                                  Nếu có bất kỳ lỗi nào trong quá trình đăng ký tài khoản, vui lòng hiện hệ với chúng tôi qua Enail để có thể khắc phục trong thời gian sớm nhất cho bạn
                                                    <br>Chân thành cảm ơn!
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:#F5F7F9;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#F5F7F9;"
                align="center" border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%"
                                    border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 20px;"
                                                align="center">
                                                <div
                                                    style="cursor:auto;color:#222228;font-family:'Avenir Next', Avenir, sans-serif;font-size:13px;line-height:20px;">
                                                  Bạn nhận được email này vì bạn đã đăng ký một tài khoản tại ${nameApp}.
                                                  Nếu bạn không chắc chắn tại sao nhận được email này, Vui lòng liên hệ với chúng tôi.
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div></div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
    </div>`
		//     <h2> Bạn nhận được email này vì đã đăng kí tài khoản trên E-learning. </h2>
		//     <h3> Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản. </h3>
		//     <h3> <a href="${linkVerify}" target="blank" > ${linkVerify}</a> </h3>
		//     <h4> Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua. Trân trọng </h4>
		// `
	},
	template_forgot_password: (linkVerify, nameApp,minute) => {
		return `  <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }

            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {

            .mj-column-per-100,
            * [aria-labelledby="mj-column-per-100"] {
                width: 100% !important;
            }

            .mj-column-per-80,
            * [aria-labelledby="mj-column-per-80"] {
                width: 80% !important;
            }

            .mj-column-per-30,
            * [aria-labelledby="mj-column-per-30"] {
                width: 30% !important;
            }

            /* .mj-column-per-70,
            * [aria-labelledby="mj-column-per-70"] {
                width: 70% !important;
            } */
        }
    </style>
    <div style="background-color:#E3E5E7;">
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:#222228;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#222228;"
                align="center" border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:480px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-80" class="mj-column-per-80"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%"
                                    border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:30px;"
                                                align="center">
                                                <table cellpadding="0" cellspacing="0"
                                                    style="border-collapse:collapse;border-spacing:0px;"
                                                    align="center" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width:80px;"><img alt="Zero To Launch"
                                                                    title="" height="auto"
                                                                    src="https://www.xyzapk.com/wp-content/uploads/2017/11/com.er_.mo_.apps_.mypasswords.jpg.png"
                                                                    style="border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:auto;"
                                                                    width="80"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 20px 0px 20px;"
                                                align="center">
                                                <div
                                                    style="cursor:auto;color:white;font-family:'Avenir Next', Avenir, sans-serif;font-size:32px;line-height:60ps;">
                                                    Lấy lại mật khẩu
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 25px 0px;">
                          
                            <!--[if mso | IE]>
  </td><td style="vertical-align:top;width:180px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-70" class="mj-column-per-70"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;"
                                                align="left">
                                                <div
                                                    style="cursor:auto;color:#222228;font-family:'Avenir Next', Avenir, sans-serif;font-size:16px;line-height:30px;">
                                                    <p>Vui lòng bấm vào nút bên dưới để thay đổi lại mật khẩu của bạn ${nameApp}!</p>
                                                    <p><b>Lưu Ý: </b> Trong vòng ${minute} phút từ khi nhận được email này, nếu bạn không có sự thay đổi nào chúng tôi sẽ huỷ yêu cầu này của bạn! </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
</td></tr></table>
<![endif]--> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px 30px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:600px;">
  <![endif]-->
                            <p style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;"></p>
                            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]-->
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:10px 25px;"
                                                align="center">
                                                <table cellpadding="0" cellspacing="0" align="center" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="border-radius:3px;color:white;cursor:auto;"
                                                                align="center" valign="middle" bgcolor="#EB5424">
                                                                <a
                                                                              href="${linkVerify}"
                                                                    style="display:inline-block;text-decoration:none;background:#EB5424;border-radius:3px;color:white;font-family:'Avenir Next', Avenir, sans-serif;font-size:14px;font-weight:500;line-height:35px;padding:10px 25px;margin:0px;"
                                                                    target="_blank">
                                                                    Tạo Mật Khẩu Mới
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:white;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center"
                border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%"
                                    border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 25px 15px;"
                                                align="left">
                                                <div
                                                    style="cursor:auto;color:#222228;font-family:'Avenir Next', Avenir, sans-serif;font-size:16px;line-height:30px;">
                                                  Nếu có bất kỳ lỗi nào trong quá trình thay đổi, vui lòng hiện hệ với chúng tôi qua Enail để có thể khắc phục trong thời gian sớm nhất cho bạn
                                                    <br>Chân thành cảm ơn!
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div style="margin:0 auto;max-width:600px;background:#F5F7F9;">
            <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#F5F7F9;"
                align="center" border="0">
                <tbody>
                    <tr>
                        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                            <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
  <![endif]-->
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100"
                                style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%"
                                    border="0">
                                    <tbody>
                                        <tr>
                                            <td style="word-break:break-word;font-size:0px;padding:0px 20px;"
                                                align="center">
                                                <div
                                                    style="cursor:auto;color:#222228;font-family:'Avenir Next', Avenir, sans-serif;font-size:13px;line-height:20px;">
                                                  Bạn nhận được email này vì bạn đã yêu cầu lấy lại mật khẩu tại ${nameApp}.
                                                  Nếu bạn không chắc chắn tại sao nhận được email này, Vui lòng liên hệ với chúng tôi.
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
        <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
        <div></div>
        <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
    </div>`
		//     <h2> Bạn nhận được email này vì đã đăng kí tài khoản trên E-learning. </h2>
		//     <h3> Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản. </h3>
		//     <h3> <a href="${linkVerify}" target="blank" > ${linkVerify}</a> </h3>
		//     <h4> Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua. Trân trọng </h4>
		// `
	},
    send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ lại bộ phận hỗ trợ ",
    subject_forgot_password :"Email xác nhận lấy lại mật khẩu",
}
