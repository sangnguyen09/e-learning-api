import express from 'express';
import ConnectDB from './config/connectDB'
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web'
import bodyParser  from "body-parser"; // dungf lay param tu request
import connectFlash  from 'connect-flash';
import configSession from './config/session'
import passport from "passport";
let app = express();

// connect to MongoDb
ConnectDB();

// sau khi ket noi dc mongo thi chay session
configSession(app);

// config view engine
configViewEngine(app);

// enable post data for request
app.use(bodyParser.urlencoded({extended: true}));
// Enable flash messages
app.use(connectFlash())

// config passport js
app.use(passport.initialize());
app.use(passport.session());

// init routes
initRoutes(app)

app.listen(process.env.APP_PORT,process.env.APP_HOST, ()=>{
    console.log(`Hello, running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
})

