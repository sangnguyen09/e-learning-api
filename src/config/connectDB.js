import mongoose from "mongoose";
import bluebird from "bluebird"; //dùng cho promise mongoose

// connect to MOngoDB

let connectDb = ()=>{
    mongoose.Promise = bluebird;


    // mongodb://localhost:27017/awesome_chat
    let URI =`mongodb://sang:sang7817@awesome-chat-shard-00-00-2ccbq.mongodb.net:27017/test`
    //let URI =`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    return  mongoose.connect(URI,{useMongoClient:true})
}

module.exports = connectDb