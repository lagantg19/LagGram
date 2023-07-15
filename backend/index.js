//this is index file for backend
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config()

const authRoutes=require('./routes/auth')

const userRoutes=require('./routes/user')  

const postRoutes=require('./routes/post')




//express app

const app=express();

app.use(cors());

//middleware

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})
//routes

//authentication(login signup routes)
app.use('/api/user',authRoutes);

//user routes
app.use('/user',userRoutes)

//post routes
app.use('/posts',postRoutes)




mongoose.connect(process.env.URL).then(()=>{
    app.listen(4000,()=>{
        console.log("Connected to Db,listening on port 4000 ")
    })
}).catch(err=>console.log(err));

