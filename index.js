const port=5000;
const express=require('express')
const mongoose=require('mongoose')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config();
const app=express();
//    
//
app.use(express.json());
app.use(cookieparser());
app.use(cors(
    {
        origin:process.env.URL, 
        credentials:true
    }
))
  

app.use('/api/v1/auth',require('./routes/userroute'))
app.use('/api/v1/inventory',require('./routes/inventory'))
app.use('/api/v1/request',require('./routes/reques'))
app.use('/api/v1/admin',require('./routes/Admin'))
app.use('/api/v1/camp',require('./routes/Bloodcamp'))
const connect=async()=>{
    try {
       await  mongoose.connect(process.env.MONGODB)
        console.log("connected")
    } catch (error) {
        console.log(error) 
    }
}


 

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
    connect(); 
})