import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import router from '../server/routes/posts.js'
import routeruser from '../server/routes/user.js'
import dotenv from 'dotenv'
const app = express()

app.use(cors());
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended:true })); 
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true }));

// All Routes 

app.use('/posts',router)
app.use('/user', routeruser)

app.get('/',(req,res)=>{
    res.send('APP IS RUNNING')
})
const PORT = process.env.PORT || 5000

await mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));