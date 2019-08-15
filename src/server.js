import express from 'express';
import ConnectDB from './config/connectDB'
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web'
import bodyParser  from "body-parser";

let app = express();

// connect to MongoDb
ConnectDB()

// config view engine
configViewEngine(app);

// enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// init routes
initRoutes(app)

app.listen(process.env.APP_PORT,process.env.APP_HOST, ()=>{
    console.log(`Hello, running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
})

