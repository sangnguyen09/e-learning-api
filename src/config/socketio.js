import passportSocketIo from 'passport.socketio';
import cookieParser from 'cookie-parser'
import session from '../config/session'

export const configSocketIo = (io) => {
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET, // tr với cấu hình bên config/session.js
        store: session.sessionStore,
        success: (data, accept) => {
            if (!data.user.logged_in) {
                return accept('Invalid user', false)
            }

            return accept(null, true);
        },
        fail: (data, message, error, accept) => {
            if (error) {
                console.log('failed connection to socket.io', message)
                return accept(new Error(message), false)
            }
        }

    }))
}