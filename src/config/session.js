import session from 'express-session';
import connectMongo  from 'connect-mongo';

let MongoStore = connectMongo(session);

/**
 * bien nay la noi luu tru session vao mongodb
 */
let sessionStore = new MongoStore({
    //url:`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    url:'mongodb://sang:sang7817@elearning-shard-00-00-fuuar.gcp.mongodb.net:27017,elearning-shard-00-01-fuuar.gcp.mongodb.net:27017,elearning-shard-00-02-fuuar.gcp.mongodb.net:27017/api-e-learning?ssl=true&replicaSet=Elearning-shard-0&authSource=admin&retryWrites=true&w=majority',
    autoReconnect: true,
    //autoRemove: 'native', tu dong remove sau khi het thoi gian song
})


/**
 * Config session for app
 * @param  app from exactly express module
 */
let config = (app)=>{
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore , // noi luu tru , mac dinh luu tren ram
        resave: true, //luu lai
        saveUninitialized:false, //giam tri phi du lieu
        cookie:{
            maxAge: 1000*60*60*24 //thoi gian song 86400000s = 1 day
        }
    }));
     
}
module.exports = {config, sessionStore};
