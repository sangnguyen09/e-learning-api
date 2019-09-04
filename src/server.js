import express from 'express';
import ConnectDB from './config/connectDB'
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web'
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
import * as configApp from './config/app'

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
session.config(app);

// config view engine
configViewEngine(app);

// enable post data for request
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
}));

// Enable flash messages
app.use(connectFlash())

// use cookie parser
app.use(cookieParser())

// config passport js
app.use(passport.initialize());
app.use(passport.session());

// init routes
initRoutes(app)

// config socketIo session gan session  vào socket để  lấy dc user 
configSocketIo(io)

// init all sockets
initSockets(io)

// server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {local
//     console.log(`Hello, running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
// })
server.listen(process.env.PORT, () => {// heroku
   // console.log(`Hello, running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
})

 