import session from 'express-session';
import connectMongo  from 'connect-mongo';

let MongoStore = connectMongo(session);

/**
 * bien nay la noi luu tru session vao mongodb
 */
let sessionStore = new MongoStore({
    url:`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect: true,
    //autoRemove: 'native', tu dong remove sau khi het thoi gian song
})

/**
 * Config session for app
 * @param  app from exactly express module
 */
let configSession = (app)=>{
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        store: sessionStore , // noi luu tru , mac dinh luu tren ram
        resave: true, //luu lai
        saveUninitialized:false, //giam tri phi du lieu
        cookie:{
            maxAge: 1000*60*60*24 //thoi gian song 86400000s = 1 day
        }
    }));
     
}
module.exports = configSession;
