import express from 'express';
import ConnectDB from './config/connectDB'
import configViewEngine from './config/viewEngine';
import router from './routes'
import bodyParser from "body-parser"; // dungf lay param tu request
import connectFlash from 'connect-flash';
import session from './config/session'
import passport from "passport";
import http from 'http';
import socketio from 'socket.io';
import initSockets from './sockets/index'

import cookieParser from 'cookie-parser'
import { configSocketIo } from './config/socketio';
import events from 'events';
import * as configApp from './config/app';
import cors from 'cors';
import { prefixApi } from './config/prefixApi';
import { initPassportLocal } from './controllers/passportController/local';
import { initPassportJWT } from './controllers/passportController/passportJWT';
import { initPassportFacebook } from './controllers/passportController/facebook';
import { initPassportGoogle } from './controllers/passportController/google';
import { env } from './config/env';

// init passport local,facebook, google, Jwt
initPassportLocal()
initPassportFacebook()
initPassportGoogle()
initPassportJWT()

// init app
let app = express();

//set max ket noi socket
events.EventEmitter.defaultMaxListeners = configApp.app.max_event_listener;

// innit server with soceketio va express app
let server = http.createServer(app);
let io = socketio(server)

// connect to MongoDb
ConnectDB();

// sau khi ket noi dc mongo thi chay session
//  session.config(app);

// config view engine
configViewEngine(app);

// enable post data for request
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({  extended: true }));

// Enable flash messages
app.use(connectFlash())

// use cookie parser
// app.use(cookieParser())

// config passport js
app.use(passport.initialize());
// app.use(passport.session()); 


app.use(cors())

// init routes
app.use(prefixApi, router)
// initRoutes(app)

// Xử lý khi có lỗi và trả về response cho client
const handleError = (err,req,res,next) => {
    var output = {
            message: err.message,
    };

    if(req.authError) {// xu lý lỗi nếu đăng nhập thất bại hoặc xác thực token thất bại
      return  res.status(401).json({message:req.authError})
    }  
    var statusCode = err.status || 500;
    res.status(statusCode).json(output);
}
app.use(handleError)

// config socketIo session gan session  vào socket để  lấy dc user 
configSocketIo(io)

// init all sockets
initSockets(io)

server.listen(env.port, env.hostname, () => {//local
    console.log(`Hello, running at ${env.hostname}:${env.port}/`)
})
// server.listen(process.env.PORT, () => {// heroku
//    // console.log(`Hello, running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
// })

 