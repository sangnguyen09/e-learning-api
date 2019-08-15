import express from 'express';
import ConnectDB from './config/connectDB'
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web'

let app = express();

// connect to MongoDb
ConnectDB()

// config view engine
configViewEngine(app);

// init routes
initRoutes(app)

app.listen(process.env.APP_PORT,process.env.APP_HOST, ()=>{
    console.log(`Hello, running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
})

