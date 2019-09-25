import dotenv from 'dotenv';

dotenv.config();

export const env = {
    hostname: process.env.APP_HOST,
    port: process.env.APP_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    fbAppId: process.env.FB_APP_ID,
    fbAppSecret: process.env.FB_APP_SECRET,
    fbAppCallbackUrl: process.env.FB_APP_CALLBACK_URL,
    ggAppId: process.env.GG_APP_ID,
    ggAppSecret: process.env.GG_APP_SECRET,
    ggAppCallbackUrl: process.env.GG_APP_CALLBACK_URL,
}