import mongoose from "mongoose";
import bluebird from "bluebird"; //dùng cho promise mongoose

// connect to MOngoDB

let connectDb = ()=>{
    mongoose.Promise = bluebird;


    // mongodb://localhost:27017/awesome_chat
    let URI =`${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    return  mongoose.connect(URI,{useMongoClient:true})
}

module.exports = connectDb