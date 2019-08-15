import express from 'express';
import ConnectDB from './config/connectDB'
import ContactModel from './models/contact.model'


let app = express();

// connect to MongoDb
ConnectDB()

let hostname ='localhost';
let port = 8017;

app.get('/test-database', async (req,res)=>{ // thằng mongoose sẽ trả về một Promise nên dùng async await để xử lý bất đồng bộ
    try {
        let item ={
            userId :"34234",
            contactId :"4234342"
        };
        let contact = await  ContactModel.createNew(item);
        res.send(contact)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port,hostname, ()=>{
    console.log(`Hello, running at ${hostname}:${port}/`)
})

