import mongoose from "mongoose";
import bluebird from "bluebird"; //dùng cho promise mongoose

// connect to MOngoDB

let connectDb = ()=>{
    mongoose.Promise = bluebird;


    // mongodb://localhost:27017/awesome_chat
    return  mongoose.connect('mongodb://sang:sang7817@awesome-chat-shard-00-00-2ccbq.mongodb.net:27017,awesome-chat-shard-00-01-2ccbq.mongodb.net:27017,awesome-chat-shard-00-02-2ccbq.mongodb.net:27017/awesome-chat?ssl=true&replicaSet=awesome-chat-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true});

 
}

module.exports = connectDb