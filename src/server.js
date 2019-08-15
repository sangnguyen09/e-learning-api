import express from 'express';
import ConnectDB from './config/connectDB'
import ContactModel from './models/contact.model'


let app = express();

// connect to MongoDb
ConnectDB()

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

app.listen(process.env.APP_PORT,process.env.APP_HOST, ()=>{
    console.log(`Hello, running at ${hostname}:${port}/`)
})

