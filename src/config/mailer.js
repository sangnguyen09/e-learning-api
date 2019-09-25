import nodeMailer from 'nodemailer'
import { env } from './env';

let adminEmail = env.mailUser;
let adminPassword = env.mailPassword;
let mailHost = env.mailHost;
let mailPort = env.mailPort;

let sendMail =(to, subject, htmlContent)=>{
    let transporter = nodeMailer.createTransport({
        host:mailHost,
        port: mailPort,
        secure: false , // dung de bat SSL-TLS
        auth:{
            user: adminEmail,
            pass: adminPassword
        }
    })
    let options ={
        from: adminEmail,
        to: to,
        subject : subject,
        html: htmlContent
    }
    return transporter.sendMail(options); // ket qua tra ve la Promise
}
module.exports =sendMail