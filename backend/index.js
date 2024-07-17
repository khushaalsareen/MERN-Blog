const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user.routes.js')
const authRoutes = require('./routes/auth.route.js')
const postRoutes = require('./routes/post.route.js')
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('DB connected successfully')
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json())
app.use(cookieParser())

app.listen(3000,()=>{
    console.log('Serer started at port ',3000)
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)

// sareenkhushaal1 CJVrcGkqAlssmtb7